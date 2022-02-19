import * as React from "react";

import { Colors } from "../../../../styles/colors";
import { NewsItem } from "../news/news-item";
import { SvgIcon } from "../svg-icon";
import { EventComments } from "./event-comments";
import { EventHeader } from "./event-header";
import { EventMembers } from "./event-members";
import { EventTags } from "./event-tags";

export const Event: React.VoidFunctionComponent = () => {
  return (
    <div className="dtp">
      <div id="toggle">
        <div id="map" />
        <div id="panorama" className="d-none" />
      </div>
      <div className="event-layer">
        <div className="container">
          <EventHeader />
          <EventTags />
          <h2 className="h2" style={{ marginBottom: "12px" }}>
            Участники ДТП
          </h2>
          <EventMembers />
          <div className="dtp-info">
            <img src="/static/media/svg/gibdd.svg" alt="Лого ГИБДД" />
            <p className="subtitle1">Официальные данные ГИБДД</p>
            <button className="btn-light" style={{ flexShrink: 0 }}>
              <SvgIcon name="warning" color={Colors.$grey70} />
              <span>Нашли ошибку?</span>
            </button>
          </div>
          <EventComments />
          <h2 className="h2" style={{ marginBottom: "8px" }}>
            Новости по теме
          </h2>
          <div
            className="news-container"
            style={{ margin: "0 -10px 14px -10px " }}
          >
            <NewsItem
              size="small"
              title="Велополоса на Лесной улице"
              img="https://img.thedailybeast.com/image/upload/v1531451526/180712-Weill--The-Creator-of-Pepe-hero_uionjj.jpg"
              link="#"
            />
            <NewsItem
              size="small"
              title="Белгород выбирает наземный переход"
              img="https://img.thedailybeast.com/image/upload/v1531451526/180712-Weill--The-Creator-of-Pepe-hero_uionjj.jpg"
              link="#"
            />
            <NewsItem
              size="small"
              title="Как депутат из Академии запустил проект по мониторингу воздуха"
              img="https://img.thedailybeast.com/image/upload/v1531451526/180712-Weill--The-Creator-of-Pepe-hero_uionjj.jpg"
              link="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
