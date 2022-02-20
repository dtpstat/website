import * as React from "react";
import { useOutsideClickRef } from "rooks";

import { SvgIcon } from "../svg-icon";
import { LayersFilter } from "./layers-filter";
import { LocationButton } from "./location-button";
import { MinimalZoomSlider as ZoomSlider } from "./zoom-slider";

export const Layers: React.VoidFunctionComponent = () => {
  const [layersVisible, setLayersVisible] = React.useState(false);

  const layerButtonClicksIgnored = React.useRef(false);
  const handleLayersButtonClick = React.useCallback(() => {
    if (layerButtonClicksIgnored.current) {
      return;
    }

    setLayersVisible((value) => !value);
  }, []);

  const handleLayersFilterOutsideClick = React.useCallback(() => {
    layerButtonClicksIgnored.current = true;
    setLayersVisible(false);

    setTimeout(() => {
      layerButtonClicksIgnored.current = false;
    }, 100);
  }, []);

  const [layersFilterRef] = useOutsideClickRef(handleLayersFilterOutsideClick);

  return (
    <div className="layers-wrap">
      <button
        className="btn-layers"
        aria-label="Настроить слои отображения"
        style={{ marginBottom: "16px" }}
        onClick={handleLayersButtonClick}
      >
        <SvgIcon name="layers" />
      </button>

      {layersVisible ? <LayersFilter ref={layersFilterRef} /> : null}
      <ZoomSlider />
      <LocationButton />
    </div>
  );
};
