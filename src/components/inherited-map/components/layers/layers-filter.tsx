import { observer } from "mobx-react";
import * as React from "react";

import { supportedConcentrationPlaces } from "../../models/map-store";
import {
  minZoomForHeatmap,
  minZoomForPoints,
  useStore,
} from "../../models/root-store";
import { SvgIcon } from "../svg-icon";

const layerConfigs = [
  {
    label: "Точки ДТП",
    icon: "location",
    maxZoom: Number.MAX_SAFE_INTEGER,
    minZoom: minZoomForPoints,
  },
  {
    label: "Тепловая карта",
    icon: "heat",
    maxZoom: minZoomForPoints - 1,
    minZoom: minZoomForHeatmap,
  },
] as const;

const RenderLayersFilter: React.ForwardRefRenderFunction<HTMLDivElement> = (
  props,
  ref,
) => {
  const { mapStore } = useStore();

  const zoom = mapStore.zoom;

  const handleLayerChange: React.ChangeEventHandler = (event) => {
    mapStore.setConcentrationPlaces(event.currentTarget.getAttribute("value"));
  };

  return (
    <div className="layers-filter" ref={ref}>
      <div style={{ marginBottom: "16px" }}>
        <h4 className="subtitle2">Отображение данных</h4>
        <ul style={{ padding: 0, margin: 0 }}>
          {layerConfigs.map(({ label, minZoom, maxZoom, icon }) => {
            const disabled = zoom < minZoom || zoom > maxZoom;

            return (
              <li style={{ marginBottom: "8px" }} key={label}>
                <label className="toggle-layer" tabIndex={0}>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled={disabled}
                    onChange={() => {}}
                  />
                  <div className="checkmark">
                    <SvgIcon name={icon} />
                    <p className="subtitle3">{label}</p>
                    <SvgIcon name="block" />
                  </div>
                  {disabled ? (
                    <p className="tooltip" style={{ width: "121px" }}>
                      <span className="subtitle3">
                        Недоступно <br /> на этом масштабе
                      </span>
                    </p>
                  ) : undefined}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h4 className="subtitle2" style={{ marginBottom: 0 }}>
            Дополнительные слои
          </h4>
        </div>
        <ul style={{ padding: 0, margin: 0 }}>
          <li>
            <label className="checkWrap" tabIndex={0}>
              Выключены
              <input
                type="radio"
                name="layer"
                value=""
                checked={!mapStore.concentrationPlaces}
                onChange={handleLayerChange}
              />
              <span className="checkmark" />
            </label>
          </li>
          {supportedConcentrationPlaces.map((value) => (
            <li key={value}>
              <label className="checkWrap" tabIndex={0}>
                Очаги аварийности ({value})
                <input
                  type="radio"
                  name="layer"
                  value={value}
                  checked={mapStore.concentrationPlaces === value}
                  onChange={handleLayerChange}
                />
                <span className="checkmark" />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const LayersFilter = observer(React.forwardRef(RenderLayersFilter));
