import { observer } from "mobx-react";
import * as React from "react";

import { Colors } from "../../../styles/colors";
import { minZoomForHeatmap, useStore } from "../models/root-store";

export const InfoPanel = observer(() => {
  const { areaStore, mapStore } = useStore();
  const { area, statistics } = areaStore;
  const { zoom } = mapStore;

  if (!area || zoom < minZoomForHeatmap) {
    return null;
  }

  return (
    <div className="info-panel-wrap">
      <div className="info-panel">
        <h3 className="h3">{area.name ? area.name : "\u00A0"}</h3>
        <p className="subtitle2" style={{ color: Colors.$grey50 }}>
          ДТП
        </p>
        <p className="subtitle2" style={{ color: Colors.$grey50 }}>
          Пострадали
        </p>
        <p className="subtitle2" style={{ color: Colors.$grey50 }}>
          Погибли
        </p>

        <p className="body2" style={{ color: Colors.$grey50 }}>
          {area.parentName}
        </p>
        <h3 className="h3" style={{ color: Colors.$greyDark }}>
          {statistics ? statistics.count : "-"}
        </h3>
        <h3 className="h3" style={{ color: Colors.$yellow }}>
          {statistics ? statistics.injured : "-"}
        </h3>
        <h3 className="h3" style={{ color: Colors.$red }}>
          {statistics ? statistics.dead : "-"}
        </h3>
      </div>
    </div>
  );
});
