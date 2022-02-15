import { observer } from "mobx-react";
import * as React from "react";

const RegionFilterSection: React.VoidFunctionComponent<{
  value: unknown;
}> = () => (
  <div className="category-item__draw" tabIndex={0}>
    <svg className="icon icon-edit">
      <use xlinkHref="/static/media/svg/sprite.svg#edit" />
    </svg>
    <button className="btn-rect">Выделить</button>
  </div>
);

export default observer(RegionFilterSection);
