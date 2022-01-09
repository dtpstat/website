import React from "react";
import { observer } from "mobx-react";

const RegionFilterSection = ({ values }) => (
  <div className="category-item__draw" tabIndex={0}>
    <svg className="icon icon-edit">
      <use xlinkHref="svg/sprite.svg#edit" />
    </svg>
    <button className="btn-rect">Выделить</button>
  </div>
);

export default observer(RegionFilterSection);