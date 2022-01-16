import { observer } from "mobx-react";
import { ParticipantsFilterType } from "models/filters/ParticipantsFilter";
import * as React from "react";

const ParticipantsFilter: React.VoidFunctionComponent<
  ParticipantsFilterType
> = (filter) =>
  console.log(filter) || (
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
            data={`${item.icon}`}
            aria-label={item.preview}
          />
          <p className="subtitle3">{item.preview}</p>
        </button>
      ))}
    </div>
  );

export default observer(ParticipantsFilter);
