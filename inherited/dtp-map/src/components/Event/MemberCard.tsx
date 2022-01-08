import React from "react";
import { Colors } from "components/ui/Colors";
import SvgIcon from "../SvgIcon";

type Props = {
  icon: string;
  color?: string;
  name: string;
  gender: string;
  exp?: string;
  descr: string;
  add?: string;
};

const EventMembers = ({
  icon,
  color,
  name,
  gender,
  exp,
  descr,
  add,
}: Props) => {
  return (
    <div className="member-card">
      <div className="card-header">
        <div
          className="icon-container"
          style={{ backgroundColor: color ? color : Colors.$grey50 }}
        >
          <SvgIcon name={icon} color={Colors.$white} />
        </div>
        <h4 className="caption">{name}</h4>
        <p className="body2">
          {gender} {exp ? `, ${exp}` : ""}
        </p>
      </div>
      <div
        className="card-body"
        style={{ backgroundColor: color ? `${color}10` : Colors.$greyLight }}
      >
        <p className="subtitle2" style={{ color: color }}>
          {descr}
        </p>
      </div>
      {add ? (
        <div
          className="card-add"
          style={{ backgroundColor: Colors.$greyLight }}
        >
          <SvgIcon name="warning" color={Colors.$greyDark} />
          <p className="subtitle2">{add}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EventMembers;
