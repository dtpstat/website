import * as React from "react";

export interface SvgIconProps {
  name: string;
  color?: string;
}

export const SvgIcon: React.VoidFunctionComponent<SvgIconProps> = ({
  name,
  color,
}) => {
  return (
    <svg className={`icon icon-${name}`} style={{ fill: color ? color : "" }}>
      <use xlinkHref={`/static/media/svg/sprite.svg#${name}`} />
    </svg>
  );
};
