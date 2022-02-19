import { observer } from "mobx-react";
import * as React from "react";

import { useStore } from "../../models/root-store";
import { SvgIcon } from "../svg-icon";

export const ZoomSlider: React.VoidFunctionComponent = () => {
  return (
    <div className="zoom" style={{ marginBottom: "16px" }}>
      <button className="btn-plus" aria-label="Приблизить" />
      <div className="input-wrap">
        <input
          type="range"
          min="1"
          max="100"
          value="50"
          className="zoom-slider"
        />
        <div className="hints-wrap">
          <button
            className="hint subtitle3"
            aria-label="Выбрать маштаб уровня домов"
          >
            Дом
          </button>
          <button
            className="hint subtitle3"
            aria-label="Выбрать маштаб уровня улиц"
          >
            Улица
          </button>
          <button
            className="hint subtitle3"
            aria-label="Выбрать маштаб уровня городов"
          >
            Город
          </button>
          <button
            className="hint subtitle3"
            aria-label="Выбрать маштаб уровня регионов"
          >
            Регион
          </button>
          <button
            className="hint subtitle3"
            aria-label="Выбрать маштаб уровня страны"
          >
            Страна
          </button>
          <button
            className="hint subtitle3"
            aria-label="Выбрать маштаб уровня всего мира"
          >
            Мир
          </button>
        </div>
      </div>
      <SvgIcon name="zones" />
      <button className="btn-minus" aria-label="Отдалить" />
    </div>
  );
};

// @todo -- remove in favour of ZoomSlider after adding events to the range control (includes removal of .zoom-minimal)
export const MinimalZoomSlider = observer<React.VoidFunctionComponent>(() => {
  const { mapStore } = useStore();
  const map = mapStore.getMap();

  if (!mapStore.mapReady || !map) {
    return <></>;
  }

  const zoom = map.getZoom();
  const [minZoom, maxZoom] = map.zoomRange.getCurrent() as [number, number];

  return (
    <div className="zoom zoom-minimal" style={{ marginBottom: "16px" }}>
      <button
        disabled={zoom > maxZoom - 1}
        className="btn-plus"
        aria-label="Приблизить"
        onClick={() => {
          void map.setZoom(map.getZoom() + 1, { duration: 200 });
        }}
      />
      <button
        disabled={mapStore.zoom < minZoom + 1}
        className="btn-minus"
        aria-label="Отдалить"
        onClick={() => {
          void map.setZoom(map.getZoom() - 1, { duration: 200 });
        }}
      />
    </div>
  );
});
