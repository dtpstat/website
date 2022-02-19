import { cast, getRoot, types } from "mobx-state-tree";
import ReactDOMServer from "react-dom/server";
import type { Map, ObjectManager } from "yandex-maps";

import { InfoBalloonContent } from "../components/info-balloon";
import { Accident, Coordinate } from "../types";
import {
  minZoomForHeatmap,
  minZoomForPoints,
  RootStoreType,
} from "./root-store";

type ConcentrationPointFeature = unknown;

const colorBySeverity: Record<number, string> = {
  0: "rgba(24, 51, 74, 0.5)",
  1: "#FFB81F",
  3: "#FF7F24",
  4: "#FF001A",
};

export const supportedConcentrationPlaces = ["2020"] as const;
export type SupportedConcentrationPlacesVariant =
  typeof supportedConcentrationPlaces[0];

const calculateMetersPerPixelInWgs84 = (latitude: number, zoom: number) => {
  const result =
    (2 * Math.PI * 6_378_137 * Math.cos((latitude * Math.PI) / 180)) /
    (256 * Math.pow(2, zoom));

  return result;
};

const pointRadiusInPixels = 5;

const forceRedraw = (objectManager: ObjectManager) => {
  const parent = objectManager.getParent();
  objectManager.setParent(null);
  objectManager.setParent(parent);
};

const fetchConcentrationPlaceFeatures = async (
  variant: string,
): Promise<ConcentrationPointFeature[]> => {
  const response = await fetch(`/data/concentration-places/${variant}.geojson`);
  const geojson = await response.json();

  return geojson.features;
};

export const buildSelection = (filters: any[]) => {
  const selection: any[] = [];
  for (const filter of filters.filter((f) => f.name !== "date")) {
    const values = filter.values
      .filter((v: any) => v.selected)
      .map((v: any) => (v.value === -1 ? v.preview : v.value));
    selection.push({ id: filter.key || filter.name, values });
  }

  return selection;
};

export const passFilters = (item: any, selection: any[]): boolean => {
  for (const filter of selection) {
    const value = item[filter.id];
    const selectedValues = filter.values;
    if (selectedValues.length === 0) {
      continue;
    }
    if (Array.isArray(value)) {
      if (!value.some((v) => selectedValues.includes(v))) {
        return false;
      }
    } else {
      if (!selectedValues.includes(value)) {
        return false;
      }
    }
  }

  return true;
};

export const MapStore = types
  .model("MapStore", {
    center: types.array(types.number),
    zoom: 1,
    mapReady: false,
    concentrationPlaces: types.maybeNull(
      types.enumeration([...supportedConcentrationPlaces]),
    ),
  })
  .actions((self) => {
    let map: Map | null = null;

    // TODO: improve types
    let pointObjectManager: any = null;
    let heatmap: any = null;

    let concentrationPlaceObjectManager: ObjectManager | null = null;
    const concentrationPlaceDataByVariant: Record<
      string,
      ConcentrationPointFeature[] | "loading" | "loadingError"
    > = {};

    const drawConcentrationPlaces = () => {
      if (!concentrationPlaceObjectManager) {
        return;
      }

      concentrationPlaceObjectManager.removeAll();

      const variant = self.concentrationPlaces;
      if (!variant) {
        return;
      }

      const data = concentrationPlaceDataByVariant[variant];
      if (!data) {
        concentrationPlaceDataByVariant[variant] = "loading";
        fetchConcentrationPlaceFeatures(variant)
          .then((features) => {
            concentrationPlaceDataByVariant[variant] = features;
          })
          .catch(() => {
            concentrationPlaceDataByVariant[variant] = "loadingError";
          })
          .finally(() => {
            drawConcentrationPlaces();
          });

        return;
      }

      if (Array.isArray(data)) {
        const zoom = self.zoom;

        concentrationPlaceObjectManager.add(
          data.map((rawFeature: any, index) => ({
            id: index,
            ...rawFeature,
            properties: {
              ...rawFeature.properties,
              hintContent: `Очаг аварийности (${variant})`,
            },
            options: {
              fillColor: "#000",
              strokeColor: "#000",
              opacity: 0.5,
              strokeWidth:
                zoom >= minZoomForPoints
                  ? 20
                  : zoom >= minZoomForHeatmap
                  ? 10
                  : 5,
              cursor: "default",
              zIndex: 1,
              zIndexHover: 1,
            },
          })),
        );
      }

      forceRedraw(concentrationPlaceObjectManager);
    };

    const setConcentrationPlaces = (variant: string | null) => {
      self.concentrationPlaces = supportedConcentrationPlaces.includes(
        variant as SupportedConcentrationPlacesVariant,
      )
        ? (variant as SupportedConcentrationPlacesVariant)
        : null;

      drawConcentrationPlaces();

      getRoot<RootStoreType>(self).onConcentrationPlacesChanged();
    };

    const updateBounds = (center: Coordinate, zoom: number) => {
      const prevZoom = self.zoom;
      self.center = cast(center);
      self.zoom = zoom;
      getRoot<RootStoreType>(self).onBoundsChanged(zoom, prevZoom);
    };

    const getMap = () => map;

    const setMap = (mapInstance: Map) => {
      map = mapInstance;
      pointObjectManager = new window.ymaps.ObjectManager({});
      concentrationPlaceObjectManager = new window.ymaps.ObjectManager({});

      pointObjectManager.objects.events.add(
        "click",
        (ev: { get: (arg0: string) => string }) => {
          handlerClickToObj(ev.get("objectId"));
        },
      );
      pointObjectManager.objects.balloon.events.add("userclose", () => {
        handlerCloseBalloon();
      });
      pointObjectManager.objects.balloon.events.add(
        "open",
        (ev: { get: (arg0: string) => string }) => {
          handlerOpenBalloon(ev.get("objectId"));
        },
      );
      pointObjectManager.clusters.balloon.events.add("close", () => {
        handlerCloseBalloon();
      });
      pointObjectManager.clusters.state.events.add("change", () => {
        handlerActiveChanged(
          pointObjectManager.clusters.state.get("activeObject"),
        );
      });
      pointObjectManager.clusters.balloon.events.add("close", () => {
        handlerCloseBalloon();
      });

      // @ts-expect-error -- TODO: investigate why Heatmap is not in @types/yandex-map
      heatmap = new window.ymaps.Heatmap([], {
        radius: 15,
        dissipating: false,
        opacity: 0.5,
        intensityOfMidpoint: 0.5,
        gradient: {
          0: "rgba(126, 171, 85, 0.0)",
          0.2: "rgba(126, 171, 85, 0.6)",
          0.4: "rgba(255, 254, 85, 0.7)",
          0.6: "rgba(245, 193, 66, 0.8)",
          0.8: "rgba(223, 130, 68, 0.9)",
          1: "rgba(176, 36, 24, 1)",
        },
      });
      heatmap.setMap(map, {});

      map.geoObjects.add(pointObjectManager);
      map.geoObjects.add(concentrationPlaceObjectManager);
      drawConcentrationPlaces();
      updateBounds(map.getCenter() as Coordinate, map.getZoom());
      self.mapReady = true;
    };

    const handlerClickToObj = (objectId: string) => {
      const obj = pointObjectManager.objects.getById(objectId);
      if (obj) {
        obj.properties.balloonContentBody = ReactDOMServer.renderToStaticMarkup(
          InfoBalloonContent({
            id: obj.properties.id,
            address: obj.properties.address,
            categoryName: obj.properties.category_name,
            dead: obj.properties.dead,
            datetime: new Date(obj.properties.datetime),
            injured: obj.properties.injured,
          }),
        );
        pointObjectManager.objects.balloon.open(objectId);
      }
    };

    const handlerActiveChanged = (obj: any) => {
      obj.properties.balloonContentBody = ReactDOMServer.renderToStaticMarkup(
        InfoBalloonContent({
          id: obj.properties.id,
          address: obj.properties.address,
          categoryName: obj.properties.category_name,
          dead: obj.properties.dead,
          datetime: new Date(obj.properties.datetime),
          injured: obj.properties.injured,
        }),
      );
      handlerOpenBalloon(obj.id);
    };

    const handlerOpenBalloon = (objectId: string) => {
      pointObjectManager.objects.balloon.setPosition(
        pointObjectManager.objects.getById(objectId).geometry.coordinates,
      );
      const currentParams = new URLSearchParams(document.location.search);
      currentParams.set("active-obj", objectId);
      window.history.pushState(null, "", `?${currentParams.toString()}`);
    };

    const handlerCloseBalloon = () => {
      const currentParams = new URLSearchParams(document.location.search);
      currentParams.delete("active-obj");
      window.history.pushState(null, "", `?${currentParams.toString()}`);
    };

    const createFeature = (acc: Accident, zoom: number) => ({
      type: "Feature",
      id: acc.id,
      geometry: {
        type: "Circle",
        radius:
          calculateMetersPerPixelInWgs84(acc.point.latitude, zoom) *
          pointRadiusInPixels,
        coordinates: [acc.point.longitude, acc.point.latitude],
      },
      properties: {
        ...acc,
        visible: true,
      },
      options: {
        fillColor: colorBySeverity[acc.severity] ?? colorBySeverity[0],
        outline: false,
        balloonOffset: [pointRadiusInPixels - 2, 0],
      },
    });

    const openActiveObjectBalloon = () => {
      const params = new URLSearchParams(window.location.search);
      const activeObject = params.get("active-obj");
      if (activeObject) {
        handlerClickToObj(activeObject);
      }
    };

    const createHeatmapFeature = (acc: Accident) => ({
      id: acc.id,
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [acc.point.longitude, acc.point.latitude],
      },
      properties: {
        weight: acc.severity,
      },
    });

    const clearObjects = () => {
      pointObjectManager.removeAll();
      heatmap.setData([]);
    };

    const recreatePoints = (accs: Accident[]) => {
      const zoom = self.zoom;

      const data = accs.map((a) => createFeature(a, zoom));
      pointObjectManager.removeAll();
      pointObjectManager.add(data);
      openActiveObjectBalloon();
    };

    const updatePointRadius = () => {
      pointObjectManager.objects.each((o: any) => {
        o.geometry.radius =
          calculateMetersPerPixelInWgs84(o.geometry.coordinates[1], self.zoom) *
          pointRadiusInPixels;
      });

      forceRedraw(pointObjectManager);

      drawConcentrationPlaces();

      openActiveObjectBalloon();
    };

    const drawHeat = (accs: any[]) => {
      pointObjectManager.removeAll();
      const data = accs.map((a) => createHeatmapFeature(a));
      heatmap.setData(data);
    };

    const setFilter = (filter: any) => {
      pointObjectManager.setFilter((f: any) => filter(f.properties));
    };

    return {
      setConcentrationPlaces,
      drawConcentrationPlaces,
      setMap,
      getMap,
      updateBounds,
      recreatePoints,
      updatePointRadius,
      clearObjects,
      drawHeat,
      setFilter,
    };
  });
