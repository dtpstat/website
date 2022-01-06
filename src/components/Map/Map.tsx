import { observer } from "mobx-react";
import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import { Map as BaseMap, Placemark, YMaps } from "react-yandex-maps";
import styled from "styled-components";

import { data } from "./data";

// import { useStore } from "../../models/RootStore";
// import { debounce } from 'utils'

const StyledMap = styled(BaseMap)`
  height: calc(100vh - 2px);
  width: 100%;
`;

const heatmapConfig = {
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
    0.0: "rgba(126, 171, 85, 0.0)",
    0.2: "rgba(126, 171, 85, 0.6)",
    0.4: "rgba(255, 254, 85, 0.7)",
    0.6: "rgba(245, 193, 66, 0.8)",
    0.8: "rgba(223, 130, 68, 0.9)",
    1.0: "rgba(176, 36, 24, 1)",
  },
};

export const Map = observer(() => {
  const mapState = { center: [55.76, 37.64], zoom: 10 };
  const [heatmapLoaded, setHeatmapLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    if (heatmapLoaded) {
      // ymaps.ready(['Heatmap']).then(function init() {
      //   console.log('ymaps', ymaps)

      //   const heatmap = new ymaps.Heatmap([], heatmapConfig);
      //   console.log('heatmap', heatmap)
      // });

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
