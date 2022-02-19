import * as React from "react";

import { Colors } from "../../../../styles/colors";
import { SvgIcon } from "../svg-icon";

export interface MemberCardProps {
  icon: string;
  color?: string;
  name: string;
  gender: string;
  exp?: string;
  descr: string;
  add?: string;
}

export const MemberCard: React.VoidFunctionComponent<MemberCardProps> = ({
  icon,
  color,
  name,
  gender,
  exp,
  descr,
  add,
}) => {
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
        <p className="subtitle2" style={{ color }}>
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
