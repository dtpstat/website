import * as React from "react";

import { Colors } from "../../../../styles/colors";
import Footer from "../Footer/Footer";
import NewsItem from "./NewsItem";

const Articles = () => {
  return (
    <div>
      <div className="article-container">
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              className="btn-rect"
              style={{
                borderRadius: "4px",
                marginRight: "8px",
                marginBottom: "8px",
              }}
            >
              <span className="subtitle3">Велосипеды</span>
            </button>
          </div>

          <h1
            className="h1"
            style={{
              margin: "0 auto 12px",
              textAlign: "center",
              maxWidth: "780px",
            }}
          >
            Негативная реакция — хороший знак для велосипедистов
          </h1>

          <p className="body1">
            29 апреля 2020
            <span style={{ color: Colors.$grey20, margin: "0 8px" }}>|</span>
            Варвара Васильева
          </p>

          <div className="main-img">
            <img
              src="https://assets3.thrillist.com/v1/image/2824030/414x310/crop;jpeg_quality=65.jpg"
              alt="cat"
            />
          </div>

          <div className="article">
            <aside>{/* Here will be social buttons */}</aside>
            <div className="article-body">
              <p className="bodySerif">
                Не прошло и недели с появления временной велодорожки на Лесной
                улице, как у нее появился противник в лице муниципального
                депутата Тверского района Кети Хараидзе. Но не стоит думать, что
                такая враждебность со стороны общества мешает велосипедизации
                Москвы. Как раз наоборот!
              </p>
              <div className="common-img">
                <img
                  src="https://assets3.thrillist.com/v1/image/2824030/414x310/crop;jpeg_quality=65.jpg"
                  alt="cat"
                />
              </div>
              <p className="bodySerif">
                Главной темой номера стал судебный иск, где заявители требовали
                убрать защищённую велополосу вдоль общественного парка
                Проспект-парк в Бруклине. Парадокс, но в роли истцов выступила
                группа под названием «Соседи за качественные велодорожки»
                (Neighbors for Better Bike Lanes).
              </p>
              <p className="bodySerif" style={{ fontStyle: "italic" }}>
                По мотивам{" "}
                <a
                  href="#"
                  style={{ borderBottom: `1px solid ${Colors.$greyDark}` }}
                  target="_blank"
                  rel="nofollow noopener"
                >
                  Блумберга
                </a>
                . Перевод Варвары Васильевой
              </p>
            </div>
          </div>

          <h2 className="h2" style={{ marginBottom: "8px" }}>
            Новости по теме
          </h2>
          <div
            className="news-container"
            style={{ margin: "0 -10px 50px -10px " }}
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
      <Footer />
    </div>
  );
};

export default Articles;
