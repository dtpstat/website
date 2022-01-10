import { observer } from "mobx-react";
import React, { FC } from "react";

import { ParticipantsFilterType } from "models/filters/ParticipantsFilter";

import config from "../../config";

const ParticipantsFilter: FC<ParticipantsFilterType> = (filter) => (
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
        {
          <object
            type="image/svg+xml"
            data={`${config.STATIC_URL}${item.icon}`}
            aria-label={item.preview}
          />
        }
        <p className="subtitle3">{item.preview}</p>
      </button>
    ))}
  </div>
);

export default observer(ParticipantsFilter);