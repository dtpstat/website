import * as React from "react";

import { SvgIcon } from "../svg-icon";
import { LayersFilter } from "./layers-filter";
import { ZoomSlider } from "./zoom-slider";

export const Layers: React.VoidFunctionComponent = () => {
  return (
    <div className="layers-wrap">
      <button
        className="btn-layers"
        aria-label="Настроить слои отображения"
        style={{ marginBottom: "16px" }}
      >
        <SvgIcon name="layers" />
      </button>

      <LayersFilter />
      <ZoomSlider />

      <button className="btn-location" aria-label="Мое местоположение">
        <SvgIcon name="location-arrow" />
      </button>
    </div>
  );
};
