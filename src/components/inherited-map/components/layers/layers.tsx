import * as React from "react";

import { SvgIcon } from "../svg-icon";
import { LayersFilter } from "./layers-filter";
import { MinimalZoomSlider as ZoomSlider } from "./zoom-slider";

export const Layers: React.VoidFunctionComponent = () => {
  const [layersVisible, setLayersVisible] = React.useState(false);

  return (
    <div className="layers-wrap">
      <button
        className="btn-layers"
        aria-label="Настроить слои отображения"
        style={{ marginBottom: "16px" }}
        onClick={() => {
          setLayersVisible(!layersVisible);
        }}
      >
        <SvgIcon name="layers" />
      </button>

      {layersVisible ? <LayersFilter /> : null}
      <ZoomSlider />

      {/*
      <button className="btn-location" aria-label="Мое местоположение">
        <SvgIcon name="location-arrow" />
      </button>
      */}
    </div>
  );
};
