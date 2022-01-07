import React from "react";
import { Placemark, YMaps } from "react-yandex-maps";

import type { MapState } from "../../types";
import { StyledMap } from "./styles";

export type MapViewProps = {
  // mapRef: React.Ref<any>;
  mapState: MapState;
  heatmap: any;
};
// inst.events.add('click', (e: any) => console.log('click', e))
// inst.events.add('sizechange', (e: any) => {
//   console.log('inst, e ',inst, e )
// })
const boundsChangeHandler = () => {
  // const { newCenter, newZoom, newBounds } = e.originalEvent
  // console.log(newCenter, newZoom, newBounds)
};
export const MapView = ({ mapState, heatmap }: MapViewProps) => (
  <>
    <YMaps>
      <StyledMap
        state={mapState}
        // instanceRef={mapRef}
        // instanceRef={inst => inst && inst.events.add('click', (e) => console.log(e))}
        instanceRef={(map) => {
          // console.log('inst', map)
          if (map) {
            // console.log('inst.events', map.events)
            // map.controls.add('zoomControl', {
            //   float: 'none',
            //   size: 'large', // 206
            // })
            // .add('geolocationControl', {
            //   float: 'none',
            // })
            map.events.add("boundschange", boundsChangeHandler);
            // console.log('heatmap', heatmap)
            if (heatmap) {
              heatmap.setMap(map);
            }

            // map.events.add('sizechange', (e: any) => console.log('inst, e ',map, e ))
          }

          return map;
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
  </>
);
