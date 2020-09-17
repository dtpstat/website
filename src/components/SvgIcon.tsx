import React from 'react';

type Props = { name : string };

const SvgIcon = ({ name } : Props) => {
    return (
      <svg className={`icon icon-${name}`}>
          <use xlinkHref={`svg/sprite.svg#${name}`}></use>
      </svg>
    );
};

export default SvgIcon;
