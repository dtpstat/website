import * as Sentry from "@sentry/nextjs";
import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";

import { useStore } from "../../models/root-store";
import { StyledMap } from "./styles";
// import { debounce } from 'utils'

const ErrorMessage = styled.div`
  position: absolute;
  bottom: 20px;
  font-size: 1.5rem;
  left: 0;
  right: 0;
  text-align: center;
  color: red;
`;

export const Map = observer(() => {
  const { mapStore } = useStore();
  // const boundsChangeHandler = React.useCallback( // TODO
  //   debounce((e) => {
  //     const { newCenter, newZoom, newBounds } = e.originalEvent
  //     mapStore.updateBounds(newCenter, newZoom, newBounds)
  //   }, 1000),
  //   [mapStore]
  // )
  const boundsChangeHandler = React.useCallback(
    (e) => {
      const { newCenter, newZoom } = e.originalEvent;
      mapStore.updateBounds(newCenter, newZoom);
    },
    [mapStore],
  );

  React.useEffect(() => {
    if (!window.ymaps) {
      return;
    }

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
          maxZoom: 20,
          minZoom: 1,
          avoidFractionalZoom: true,
          yandexMapDisablePoiInteractivity: true,
          suppressMapOpenBlock: true,
        },
      );
      mapStore.setMap(map);
      map.copyrights.add(
        '<a href="https://dtp-stat.ru/opendata/">Официальные данные ГИБДД</a>',
      );
      map.events.add("boundschange", boundsChangeHandler);

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

      map.events.add("sizechange", () => {
        updatePos(mapRef.current.offsetHeight);
      });
    });
  }, [mapStore, boundsChangeHandler]);

  const mapRef = React.useRef();

  React.useEffect(() => {
    if (!window.ymaps) {
      Sentry.captureException(
        new Error("Map was not rendered because window.ymaps is undefined"),
      );
    }
  }, []);

  if (!window.ymaps) {
    return (
      <ErrorMessage>
        Яндекс.Карты не загрузились. Попробуйте обновить страницу.
      </ErrorMessage>
    );
  }

  return <StyledMap id="map" ref={mapRef} />;
});
