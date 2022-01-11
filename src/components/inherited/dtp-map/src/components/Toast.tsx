import React from "react";

import SvgIcon from "./SvgIcon";

const Toast = () => {
  return (
    <div>
      <div
        className="toast"
        role="link"
        style={{
          bottom: "100px",
          flexDirection: "column",
          height: "66px",
        }}
      >
        <p className="body3">Сбор пожертвований на проект</p>
        <div className="progress-wrap" style={{ margin: "8px 0 4px" }}>
          <div className="progress-bar" style={{ width: "45%" }} />
        </div>
        <p className="body3">35 576 ₽ из 50 000 ₽</p>
        <button aria-label="Закрыть">
          <SvgIcon name="decline" />
        </button>
      </div>

      <div className="toast" role="link">
        <div className="img" />
        <p className="body3">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum, in.
        </p>
        <button aria-label="Закрыть">
          <SvgIcon name="decline" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
