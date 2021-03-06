import * as React from "react";

import { SvgIcon } from "./svg-icon";

export const NewsItem: React.VoidFunctionComponent = () => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="h3">Заголовок модального окна</h3>
          <button aria-label="Закрыть модальное окно">
            <SvgIcon name="decline" />
          </button>
        </div>

        <div className="modal-body" style={{ height: "400px" }} />

        <div className="modal-footer">
          <button className="btn-light">
            <span className="subtitle1">Нет, спасибо</span>
          </button>
          <button className="btn-dark">
            <span className="subtitle1">Да, пожалуйста</span>
          </button>
        </div>
      </div>
    </div>
  );
};
