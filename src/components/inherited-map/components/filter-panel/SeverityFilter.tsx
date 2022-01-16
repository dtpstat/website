import { observer } from "mobx-react";
import * as React from "react";

import { Colors } from "../../../../styles/colors-tmp";
import { SeverityFilterType } from "../../models/filters/SeverityFilter";

const SeverityFilterSection: React.VoidFunctionComponent<
  SeverityFilterType
> = ({ values }) => (
  <div>
    {values.map((item) => (
      <label key={item.value} className="severity-item" tabIndex={0}>
        <input
          type="checkbox"
          checked={item.selected}
          disabled={item.disabled}
          onChange={item.changeSelection}
        />
        <span className="checkmark">
          <svg className="icon icon-check">
            <use xlinkHref="/static/media/svg/sprite.svg#check" />
          </svg>
        </span>
        <div
          className="severity-color"
          style={{
            background: item.disabled ? Colors.$grey50 : item.color,
          }}
        />
        <p
          className="body1"
          style={{
            color: item.disabled ? Colors.$grey50 : Colors.$greyDark,
          }}
        >
          {item.preview}
        </p>
      </label>
    ))}
  </div>
);

export default observer(SeverityFilterSection);
