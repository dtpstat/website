import React from "react";

import { Colors } from "./ui/Colors";
import SvgIcon from "./SvgIcon";

const InfoBaloon = () => (
  <div
    className="baloon"
    style={{ position: "absolute", top: "70%", left: "50%" }}
  >
    <div className="balloon-header">
      <h4 className="subtitle1">Наезд на пешехода</h4>
    </div>
    <div className="baloon-body">
      <p className="body3">15.04.2018, 9:00</p>
      <p className="body3">г Москва, ул Мытная, 46 СТР3</p>
      <p className="subtitle3" style={{ color: Colors.$yellow }}>
        1 человек пострадал
      </p>
    </div>
    <div className="baloon-footer">
      <button className="btn-light">Подробности ДТП</button>
    </div>
    <SvgIcon name="pointer" />
  </div>
);

export default InfoBaloon;
