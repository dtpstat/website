import { observer } from "mobx-react";
import * as React from "react";

import { ParticipantsFilterType } from "../../models/filters/participants-filter";

export const ParticipantsFilter = observer<
  React.VoidFunctionComponent<ParticipantsFilterType>
>((filter) => (
  <div className="participant-filter">
    {filter.values.map((item) => (
      <button
        key={item.value}
        className={
          item.selected ? "participant-item active" : "participant-item"
        }
        // selected={item.selected}
        tabIndex={0}
        onClick={item.selectOne}
      >
        <object
          type="image/svg+xml"
          data={item.icon}
          aria-label={item.preview}
        />
        <p className="subtitle3">{item.preview}</p>
      </button>
    ))}
  </div>
));
