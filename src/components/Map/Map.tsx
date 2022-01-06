import { observer } from "mobx-react";
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import { Placemark, YMaps } from "react-yandex-maps";

import {
  // useAppDispatch,
  useAppSelector,
} from "../../store/hooks";
import { selectMapState } from "../../store/slices/mapStateSlice";
import { heatmapConfig } from "./config";
import { data } from "./data";
import { StyledMap } from "./styles";

// import { useStore } from "../../models/RootStore";
// import { debounce } from 'utils'

export const Map = observer(() => {
  // const dispatch = useAppDispatch();
  const mapState = useAppSelector(selectMapState);
  const [heatmapLoaded, setHeatmapLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (heatmapLoaded) {
      window.ymaps.ready(["Heatmap"]).then(() => {
        const hmdata = [];
        for (let i = 0; i < data.length; i++) {
          hmdata.push([
            data[i].Cells.geoData.coordinates[1],
            data[i].Cells.geoData.coordinates[0],
          ]);
        }

        const heatmap = new window.ymaps.Heatmap(hmdata, heatmapConfig);

        heatmap.setMap(mapRef.current);
      });
    }
  }, [heatmapLoaded]);

  return (
    <>
      {/* <Script src="https://api-maps.yandex.ru/2.1/?apikey=ad7c40a7-7096-43c9-b6e2-5e1f6d06b9ec&lang=ru_RU" strategy="beforeInteractive" /> */}
      <Script
        id="ymaps-heatmap"
        src="https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          setHeatmapLoaded(true);
        }}
      />
      <YMaps>
        <StyledMap defaultState={mapState} instanceRef={mapRef}>
          <Placemark
            geometry={[55.751574, 37.573856]}
            properties={{
              hintContent: "Собственный значок метки",
              balloonContent: "Это красивая метка",
            }}
          />
        </StyledMap>
      </YMaps>
    </>
  );
});

// export const Map = observer(function Map() {
//   const mapState = { center: [55.76, 37.64], zoom: 10 };
//   return <YMaps>
//     <StyledMap defaultState={mapState} width="100%" onLoad={(ymaps: any) => console.log('ymaps', ymaps)}  >

//       <Placemark
//         geometry={[55.751574, 37.573856]}
//         properties={{
//           hintContent: 'Собственный значок метки',
//           balloonContent: 'Это красивая метка'
//         }}
//       />

//     </StyledMap>
//   </YMaps>
// });

// export const Map = observer(function Map() {
//   const { mapStore } = useStore();

//   const boundsChangeHandler = useCallback(
//     (e) => {
//       const { newCenter, newZoom, newBounds } = e.originalEvent;
//       // mapStore.updateBounds(newCenter, newZoom, newBounds);
//     },
//     [mapStore],
//   );
//   useEffect(() => {
//     const ymaps = window?.ymaps ?? null
//     window.ymaps.ready(["Heatmap"]).then(() => {
//       const { center, zoom } = mapStore;
//       const map = new window.ymaps.Map(
//         "map",
//         {
//           center,
//           zoom,
//           controls: [],
//         },
//         {
//           avoidFractionalZoom: true,
//         },
//       );
//       mapStore.setMap(map);
//       map.events.add("boundschange", boundsChangeHandler);
//       map.controls
//         .add("zoomControl", {
//           float: "none",
//           size: "large", // 206
//           // position: { right: 20, top: 20 },
//         })
//         .add("geolocationControl", {
//           float: "none",
//           // position: { right: 20, top: 20 + 206 + 16 },
//         });

//       // move to center
//       const updatePos = (h: number) => {
//         const top = (h - (206 + 16 + 28)) / 2;
//         map.controls
//           .get("zoomControl")
//           .options.set("position", { top, right: 20 });
//         map.controls
//           .get("geolocationControl")
//           .options.set("position", { top: top + 206 + 16, right: 20 });
//       };
//       updatePos(mapRef.current.offsetHeight);
//       map.events.add("sizechange", (e) => {
//         updatePos(mapRef.current.offsetHeight);
//       });
//     });
//   }, [mapStore, boundsChangeHandler]);

//   const mapRef = React.useRef();

//   return <div id="map" ref={mapRef} />;
// });
