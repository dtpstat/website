import * as React from "react";

type Props = { name: string; color?: string };

export const SvgIcon = ({ name, color }: Props) => {
  return (
    <svg className={`icon icon-${name}`} style={{ fill: color ? color : "" }}>
      <use xlinkHref={`/static/media/svg/sprite.svg#${name}`} />
    </svg>
  );
};
