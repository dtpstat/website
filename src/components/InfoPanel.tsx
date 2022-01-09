import { observer } from "mobx-react";
import React from "react";

import { useStore } from "../models/RootStore";
import { Colors } from "../styles/Colors";

const InfoPanelObservable = observer(() => {
  const { areaStore } = useStore();
  const { area, statistics } = areaStore;
  if (!area) {
    return null;
  }

  return (
    <div className="info-panel-wrap">
      <div className="info-panel">
        <h3 className="h3">{area.name || "\u00A0"}</h3>
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

export { InfoPanelObservable as InfoPanel };
