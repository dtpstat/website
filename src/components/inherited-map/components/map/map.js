import * as Sentry from "@sentry/nextjs";
import { observer } from "mobx-react";
import * as React from "react";
import styled from "styled-components";

import { useStore } from "../../models/root-store";
import { StyledMap } from "./styles";

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
  const boundsChangeHandler = React.useCallback(
    (event) => {
      const { newCenter, newZoom } = event.originalEvent;
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
        '<a href="https://dtp-stat.ru/opendata" target="_blank">Официальные данные ГИБДД</a>',
      );
      map.events.add("boundschange", boundsChangeHandler);
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
