// import React, { useEffect, useCallback, useRef } from "react";
import { observer } from "mobx-react";
import React, { useRef } from "react";
import { Map as BaseMap, Placemark, YMaps } from "react-yandex-maps";
import styled from "styled-components";

// import { useStore } from "../../models/RootStore";
// import { debounce } from 'utils'

const StyledMap = styled(BaseMap)`
  height: calc(100vh - 2px);
  width: 100%;
`;

export const Map = observer(() => {
  const mapState = { center: [55.76, 37.64], zoom: 10 };
  const mapRef = useRef(null);
  // console.log(mapRef.current)

  return (
    <YMaps>
      <StyledMap
        defaultState={mapState}
        instanceRef={mapRef}
        onLoad={() => {
          // console.log(mapRef.current)
        }}
      >
        <Placemark
          geometry={[55.751574, 37.573856]}
          properties={{
            hintContent: "Собственный значок метки",
            balloonContent: "Это красивая метка",
          }}
        />
      </StyledMap>
    </YMaps>
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
