import * as React from "react";

type Props = { name: string; color?: string };

const SvgIcon = ({ name, color }: Props) => {
  return (
    <svg className={`icon icon-${name}`} style={{ fill: color ? color : "" }}>
      <use xlinkHref={`svg/sprite.svg#${name}`} />
    </svg>
  );
};

export default SvgIcon;
