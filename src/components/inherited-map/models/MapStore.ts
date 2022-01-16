import { cast, getRoot, types } from "mobx-state-tree";
import ReactDOMServer from "react-dom/server";

import { Coordinate } from "../../../types";
import { InfoBalloonContent } from "../components/InfoBalloon";
import { RootStoreType } from "./RootStore";

// const supportedIconsBySeverity = {
//   0: 'svg/circle-0.svg',
//   1: 'svg/circle-1.svg',
//   3: 'svg/circle-3.svg',
//   4: 'svg/circle-4.svg',
//   default: 'svg/circle-default.svg',
// }

const colorBySeverity = {
  1: "#FFB81F",
  3: "#FF7F24",
  4: "#FF001A",
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
  })
  .actions((self) => {
    // TODO: improve types
    let map: any = null;
    let objectManager: any = null;
    let heatmap: any = null;

    function updateBounds(center: Coordinate, zoom: number) {
      const prevZoom = self.zoom;
      self.center = cast(center);
      self.zoom = zoom;
      getRoot<RootStoreType>(self).onBoundsChanged(zoom, prevZoom);
    }

    const getMap = () => map;

    function setMap(mapInstance: any) {
      map = mapInstance;

      // @ts-ignore WIP: figure out and fix @ts-ignore
      objectManager = new window.ymaps.ObjectManager({
        clusterize: true,
        gridSize: 256,
        clusterIconPieChartRadius: (node: any) => {
          let radius = 0;
          for (let i = 0, r = node.length; i < r; i++) {
            radius += node[i].weight;
          }

          return 15 + 4 * Math.floor(Math.log(radius));
        },
        showInAlphabeticalOrder: true,
        clusterDisableClickZoom: true,
        clusterIconLayout: "default#pieChart",
      });

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

      // @ts-ignore WIP: figure out and fix @ts-ignore
      heatmap = new window.ymaps.Heatmap([], {
        radius: 15,
        dissipating: false,
        opacity: 0.5,
        intensityOfMidpoint: 0.5,
        // gradient: {
        //   0.1: 'rgba(128, 255, 0, 0.7)',
        //   0.2: 'rgba(255, 255, 0, 0.8)',
        //   0.7: 'rgba(234, 72, 58, 0.9)',
        //   1.0: 'rgba(162, 36, 25, 1)',
        // },
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

      updateBounds(map.getCenter(), map.getZoom());
    }

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
      const currentParams = new URLSearchParams(document.location.search);
      currentParams.set("active-obj", objectId);
      window.history.pushState(null, "", `?${currentParams.toString()}`);
    };

    const handlerCloseBalloon = () => {
      const currentParams = new URLSearchParams(document.location.search);
      currentParams.delete("active-obj");
      window.history.pushState(null, "", `?${currentParams.toString()}`);
    };

    const createFeature = (acc: any) => ({
      type: "Feature",
      id: acc.id,
      geometry: {
        type: "Point",
        coordinates: [acc.point.latitude, acc.point.longitude],
      },
      properties: {
        ...acc,
        clusterCaption: acc.datetime.split("T")[0],
        visible: true,
      },
      options: {
        // iconLayout: 'default#image',
        // // @ts-ignore WIP: figure out and fix @ts-ignore
        // iconImageHref: supportedIconsBySeverity[acc.severity],
        // iconImageSize: [10, 10],
        // iconImageOffset: [-5, -5],

        preset: "islands#circleIcon",
        // @ts-ignore WIP: figure out and fix @ts-ignore
        iconColor: colorBySeverity[acc.severity],
      },
    });

    const createHeatFeature = (acc: any) => ({
      id: acc.id,
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [acc.point.latitude, acc.point.longitude],
      },
      properties: {
        weight: acc.severity,
      },
    });

    const drawPoints = (accs: any[]) => {
      objectManager.removeAll();
      heatmap.setData([]);
      const data = accs.map((a) => createFeature(a));
      objectManager.add(data);

      const params = new URLSearchParams(window.location.search);
      const activeObject = params.get("active-obj");
      if (activeObject) {
        handlerClickToObj(activeObject);
      }
    };

    const drawHeat = (accs: any[]) => {
      objectManager.removeAll();
      const data = accs.map((a) => createHeatFeature(a));
      heatmap.setData(data);
    };

    const setFilter = (filter: any) => {
      objectManager.setFilter((f: any) => filter(f.properties));
    };

    return {
      setMap,
      getMap,
      updateBounds,
      drawPoints,
      drawHeat,
      setFilter,
    };
  });
