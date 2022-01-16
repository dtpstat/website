import { Colors } from "components/ui/Colors";
import * as React from "react";

import NewsItem from "../News/NewsItem";
import SvgIcon from "../SvgIcon";
import EventComments from "./EventComments";
import EventHeader from "./EventHeader";
import EventMembers from "./EventMembers";
import EventTags from "./EventTags";

const Event = () => {
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
            <img src="svg/gibdd.svg" alt="Лого ГИБДД" />
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

export default Event;
