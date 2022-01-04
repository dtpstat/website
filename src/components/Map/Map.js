import React, { useCallback } from "react";
import { observer } from "mobx-react";

import { useStore } from "../../models/RootStore";
// import { debounce } from 'utils'

export const Map = observer(function Map() {
  const { mapStore } = useStore();
  // const boundsChangeHandler = useCallback( // TODO
  //   debounce((e) => {
  //     const { newCenter, newZoom, newBounds } = e.originalEvent
  //     mapStore.updateBounds(newCenter, newZoom, newBounds)
  //   }, 1000),
  //   [mapStore]
  // )
  const boundsChangeHandler = useCallback(
    (e) => {
      const { newCenter, newZoom, newBounds } = e.originalEvent;
      mapStore.updateBounds(newCenter, newZoom, newBounds);
    },
    [mapStore],
  );
  React.useEffect(() => {
    window.ymaps.ready(["Heatmap"]).then(() => {
      const { center, zoom } = mapStore;
      const map = new window.ymaps.Map(
        "map",
        {
          center,
          zoom,
          controls: [],
        },
        {
          avoidFractionalZoom: true,
        },
      );
      mapStore.setMap(map);
      map.events.add("boundschange", boundsChangeHandler);
      map.controls
        .add("zoomControl", {
          float: "none",
          size: "large", // 206
          // position: { right: 20, top: 20 },
        })
        .add("geolocationControl", {
          float: "none",
          // position: { right: 20, top: 20 + 206 + 16 },
        });

      // move to center
      const updatePos = (h) => {
        const top = (h - (206 + 16 + 28)) / 2;
        map.controls
          .get("zoomControl")
          .options.set("position", { top, right: 20 });
        map.controls
          .get("geolocationControl")
          .options.set("position", { top: top + 206 + 16, right: 20 });
      };
      updatePos(mapRef.current.offsetHeight);
      map.events.add("sizechange", (e) => {
        updatePos(mapRef.current.offsetHeight);
      });
    });
  }, [mapStore, boundsChangeHandler]);

  const mapRef = React.useRef();

  return <div id="map" ref={mapRef} />;
});
