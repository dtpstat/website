import React from "react";

import SvgIcon from "../SvgIcon";
import LayersFilter from "./LayersFilter";
import ZoomSlider from "./ZoomSlider";

const Layers = () => {
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

export default Layers;
