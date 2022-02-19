import * as React from "react";

import {
  djangoBaseUrl,
  djangoContentFallback,
} from "../../../shared/django-helpers";
import { Colors } from "../../../styles/colors";
import { SvgIcon } from "./svg-icon";

interface Props {
  id: string;
  address: string;
  categoryName: string;
  datetime: Date;
  dead: number;
  injured: number;
}

export const InfoBalloon = (props: Props) => (
  <div className="balloon">
    <InfoBalloonContent {...props} />
    <SvgIcon name="pointer" />
  </div>
);

export const InfoBalloonContent = (props: Props) => {
  const dateTime = props.datetime.toLocaleString("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  let injuredMessage = `${props.injured} человек пострадали`;
  if (props.injured % 10 === 1 && props.injured !== 11) {
    injuredMessage = `${props.injured} человек пострадал`;
  }

  let deadMessage = `${props.dead} человек погибли`;
  if (props.dead % 10 === 1 && props.dead !== 11) {
    deadMessage = `${props.dead} человек погиб`;
  }

  return (
    <div className="balloon-content">
      <h4 className="subtitle1">{props.categoryName}</h4>
      <p className="balloon-time body3">{dateTime}</p>
      {props.address ? (
        <p className="balloon-address body3">{props.address}</p>
      ) : undefined}
      <div className="balloon-injured">
        {props.injured > 0 ? (
          <p className="subtitle3" style={{ color: Colors.$yellow }}>
            {injuredMessage}
          </p>
        ) : undefined}
        {props.dead > 0 ? (
          <p className="subtitle3" style={{ color: Colors.$red }}>
            {deadMessage}
          </p>
        ) : undefined}
      </div>
      <div className="balloon-footer">
        <a
          id="balloon-button"
          className="btn-light"
          href={`${djangoContentFallback ? "" : djangoBaseUrl}/dtp/${props.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Подробности ДТП
        </a>
      </div>
    </div>
  );
};
