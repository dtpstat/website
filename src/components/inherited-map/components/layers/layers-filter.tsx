import * as React from "react";

import { SvgIcon } from "../svg-icon";

const renderLayersFilter: React.ForwardRefRenderFunction<HTMLDivElement> = (
  props,
  ref,
) => {
  return (
    <div className="layers-filter" ref={ref}>
      {/*
      <div style={{ marginBottom: "16px" }}>
        <h4 className="subtitle2">Отображение данных</h4>
        <ul style={{ padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "8px" }}>
            <label className="toggle-layer" tabIndex={0}>
              <input type="checkbox" checked={true} onChange={() => {}} />
              <div className="checkmark">
                <SvgIcon name="location" />
                <p className="subtitle3">Точки ДТП</p>
                <SvgIcon name="block" />
              </div>
            </label>
          </li>
          <li>
            <label className="toggle-layer" tabIndex={0}>
              <input
                type="checkbox"
                checked={false}
                disabled={true}
                onChange={() => {}}
              />
              <div className="checkmark">
                <SvgIcon name="heat" />
                <p className="subtitle3">Тепловая карта</p>
                <SvgIcon name="block" />
              </div>
              <p className="tooltip" style={{ width: "121px" }}>
                <span className="subtitle3">
                  Недоступно <br /> на этом масштабе
                </span>
              </p>
            </label>
          </li>
        </ul>
      </div>
      */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h4 className="subtitle2" style={{ marginBottom: 0 }}>
            Дополнительные слои
          </h4>
          {/*
          <button className="btn-question" style={{ marginLeft: "auto" }}>
            <SvgIcon name="question" />
            <p className="tooltip" style={{ width: "121px" }}>
              <span className="subtitle3">
                Недоступно <br /> на этом масштабе
              </span>
            </p>
          </button>
          */}
        </div>
        <ul style={{ padding: 0, margin: 0 }}>
          <li>
            <label className="checkWrap" tabIndex={0}>
              Выключены
              <input type="radio" checked={true} name="radio" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <label className="checkWrap" tabIndex={0}>
                Очаги аварийности
                <input type="radio" checked={false} name="radio" />
                <span className="checkmark" />
              </label>
              <button className="btn-question" style={{ marginLeft: "auto" }}>
                <SvgIcon name="question" />
                <p
                  className="tooltip tooltip-position-bottom-right"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <span className="subtitle3">
                    Данные ГИБДД
                    <br />
                    за 2020 год
                  </span>
                </p>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const LayersFilter = React.forwardRef(renderLayersFilter);
