import { cast, getRoot, types } from "mobx-state-tree";
import ReactDOMServer from "react-dom/server";
import type { Map, ObjectManager } from "yandex-maps";

import { InfoBalloonContent } from "../components/info-balloon";
import { Accident, Coordinate } from "../types";
import { RootStoreType } from "./root-store";

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

const generateConcentrationPlaceLayer = () => {
  return new window.ymaps.ObjectManager({
    ...({
      geoObjectFillColor: "#000",
      geoObjectStrokeColor: "#000",
      geoObjectOpacity: 0.4,
      geoObjectStrokeWidth: 20,
      geoObjectCursor: "default",
      geoObjectInteractivityModel: "default#transparent",
      geoObjectZIndex: 1,
      geoObjectZIndexHover: 1,
    } as any) /* Typings for ObjectManager options don’t support geoObject prefix */,
  });
};
const populateConcentrationPlaceLayer = async (
  concentrationPlaceLayer: ObjectManager,
  variant: string,
) => {
  const response = await fetch(`/data/concentration-places/${variant}.geojson`);
  const geojson = await response.json();

  concentrationPlaceLayer.add(
    geojson.features.map((feature: any, index: number) => ({
      id: index,
      ...feature,
    })),
  );
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
    let objectManager: any = null;
    let heatmap: any = null;

    const concentrationPlaceLayerByVariant: Record<string, ObjectManager> = {};

    const drawConcentrationPlaces = () => {
      if (!map) {
        return;
      }
      const variant = self.concentrationPlaces;

      for (const concentrationPlaceLayer of Object.values(
        concentrationPlaceLayerByVariant,
      )) {
        map.geoObjects.remove(concentrationPlaceLayer);
      }

      if (variant) {
        let concentrationPlaceLayer = concentrationPlaceLayerByVariant[variant];
        if (!concentrationPlaceLayer) {
          concentrationPlaceLayer = generateConcentrationPlaceLayer();

          concentrationPlaceLayerByVariant[variant] = concentrationPlaceLayer;
          void populateConcentrationPlaceLayer(
            concentrationPlaceLayer,
            variant,
          );
        }
        map.geoObjects.add(concentrationPlaceLayer);
      }
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
      objectManager = new window.ymaps.ObjectManager({});

      objectManager.objects.events.add(
        "click",
        (ev: { get: (arg0: string) => string }) => {
          handlerClickToObj(ev.get("objectId"));
        },
      );
      objectManager.objects.balloon.events.add("userclose", () => {
        handlerCloseBalloon();
      });
      objectManager.objects.balloon.events.add(
        "open",
        (ev: { get: (arg0: string) => string }) => {
          handlerOpenBalloon(ev.get("objectId"));
        },
      );
      objectManager.clusters.balloon.events.add("close", () => {
        handlerCloseBalloon();
      });
      objectManager.clusters.state.events.add("change", () => {
        handlerActiveChanged(objectManager.clusters.state.get("activeObject"));
      });
      objectManager.clusters.balloon.events.add("close", () => {
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

      map.geoObjects.add(objectManager);
      drawConcentrationPlaces();
      updateBounds(map.getCenter() as Coordinate, map.getZoom());
      self.mapReady = true;
    };

    const handlerClickToObj = (objectId: string) => {
      const obj = objectManager.objects.getById(objectId);
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
        objectManager.objects.balloon.open(objectId);
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
      objectManager.objects.balloon.setPosition(
        objectManager.objects.getById(objectId).geometry.coordinates,
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
      objectManager.removeAll();
      heatmap.setData([]);
    };

    const recreatePoints = (accs: Accident[]) => {
      const zoom = self.zoom;

      const data = accs.map((a) => createFeature(a, zoom));
      objectManager.removeAll();
      objectManager.add(data);
      openActiveObjectBalloon();
    };

    const updatePointRadius = () => {
      objectManager.objects.each((o: any) => {
        o.geometry.radius =
          calculateMetersPerPixelInWgs84(o.geometry.coordinates[1], self.zoom) *
          pointRadiusInPixels;
      });

      // This trick helps redraw circles, otherwise their radius is cached
      const parent = objectManager.getParent();
      objectManager.setParent(null);
      objectManager.setParent(parent);
      drawConcentrationPlaces();

      openActiveObjectBalloon();
    };

    const drawHeat = (accs: any[]) => {
      objectManager.removeAll();
      const data = accs.map((a) => createHeatmapFeature(a));
      heatmap.setData(data);
    };

    const setFilter = (filter: any) => {
      objectManager.setFilter((f: any) => filter(f.properties));
    };

    return {
      setConcentrationPlaces,
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
