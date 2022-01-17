import { observer } from "mobx-react";
import * as React from "react";
import ReactTooltip from "react-tooltip";

import { Colors } from "../../../../styles/colors";
import { SeverityFilterType } from "../../models/filters/SeverityFilter";

const SeverityFilterSection: React.VoidFunctionComponent<
  SeverityFilterType
> = ({ values }) => (
  <div>
    {values.map((item) => (
      <div className="severity-wrapper" key={item.value}>
        <label className="severity-item" tabIndex={0}>
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
        {item.description ? (
          <img
            src="/static/media/svg/question-mark.svg"
            data-tip={item.description}
            data-event="click focus hover"
            data-place="right"
            className="severity-item-hint"
            alt={`Что такое "Вред здоровью: ${item.preview}"`}
          />
        ) : undefined}
      </div>
    ))}
    <ReactTooltip globalEventOff="click" />
  </div>
);
export default observer(SeverityFilterSection);
