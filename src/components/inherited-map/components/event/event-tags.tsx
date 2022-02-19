import * as React from "react";

export const EventTags: React.VoidFunctionComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        maxHeight: "88px",
        overflow: "hidden",
        marginBottom: "20px",
      }}
    >
      <button
        className="btn-rect"
        style={{ marginBottom: "6px", marginRight: "8px", borderRadius: "4px" }}
      >
        <span className="subtitle2">Ясно</span>
      </button>
      <button
        className="btn-rect"
        style={{ marginBottom: "6px", marginRight: "8px", borderRadius: "4px" }}
      >
        <span className="subtitle2">Светлое время суток</span>
      </button>
      <button
        className="btn-rect"
        style={{ marginBottom: "6px", marginRight: "8px", borderRadius: "4px" }}
      >
        <span className="subtitle2">Покрытие — сухое</span>
      </button>
      <button
        className="btn-rect"
        style={{ marginBottom: "6px", marginRight: "8px", borderRadius: "4px" }}
      >
        <span className="subtitle2">Многоквартирные жилые дома</span>
      </button>
      <button
        className="btn-rect"
        style={{ marginBottom: "6px", marginRight: "8px", borderRadius: "4px" }}
      >
        <span className="subtitle2">Нерегулируемый пешеходный переход</span>
      </button>
      <button
        className="btn-rect"
        style={{ marginBottom: "6px", marginRight: "8px", borderRadius: "4px" }}
      >
        <span className="subtitle2">Выезд с прилегающей территории</span>
      </button>
      <button
        className="btn-rect"
        style={{ marginBottom: "6px", marginRight: "8px", borderRadius: "4px" }}
      >
        <span className="subtitle2">Ещё 5 тегов...</span>
      </button>
    </div>
  );
};
