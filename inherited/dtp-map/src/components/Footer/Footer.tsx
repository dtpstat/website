import React from "react";
import { Colors } from "components/ui/Colors";
import SvgIcon from "../SvgIcon";

const Footer = () => {
  return (
    <div className="footer">
      <div
        className="container"
        style={{
          overflow: "hidden",
          borderBottom: `1px solid rgba(24,51,74,0.1)`,
        }}
      >
        <div className="footer-wrap">
          <div>
            <img src="svg/logo.svg" alt="Лого сайта" />
            <p className="body1" style={{ marginTop: "18px" }}>
              Проект посвящен проблеме дорожно-транспортных происшествий
              в России. Цель проекта — повышение безопасности дорожного движения
              и снижение смертности в ДТП.
            </p>
          </div>

          <div>
            <h3 className="h3" style={{ marginBottom: "14px" }}>
              Сбор регулярных пожертвований на проект
            </h3>
            <div className="progress-wrap" style={{ marginBottom: "8px" }}>
              <div className="progress-bar" style={{ width: "65%" }}></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <p className="body1">Собрано: 35 576 ₽ из 50 000 ₽</p>
              <p className="body1" style={{ color: Colors.$grey50 }}>
                Осталось 12 дней
              </p>
            </div>
            <a
              href="/donate/"
              className="btn-dark"
              style={{ marginLeft: "auto", width: "fit-content" }}
              rel="nofollow noopener"
              target="_blank"
            >
              Поддержать проект
            </a>
          </div>

          <div>
            <h3 className="h3" style={{ marginBottom: "14px" }}>
              Мы в социальных сетях
            </h3>
            <div style={{ display: "flex" }}>
              <a href="https://t.me/dtp_stat" className="social-tg">
                <SvgIcon name="telegram" color={Colors.$white} />
                <span className="body2">Карта ДТП в Телеграме</span>
              </a>
              <a href="https://twitter.com/dtp_stat" className="social-tw">
                <SvgIcon name="twitter" color={Colors.$white} />
                <span className="body2">Карта ДТП в Твиттере</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="h3" style={{ marginBottom: "14px" }}>
              Наши партнёры
            </h3>
            <div style={{ display: "flex", alignItems: "center" }}>
              <a
                href="https://city4people.ru/"
                aria-label="Городские проекты Ильи Варламова и Максима Каца"
                rel="nofollow noopener"
                target="_blank"
              >
                <SvgIcon name="cityprojects" />
              </a>
              <a
                href="http://shtab.co/"
                aria-label="Штаб (центр городских проектов)"
                rel="nofollow noopener"
                target="_blank"
              >
                <SvgIcon name="hq" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <SvgIcon name="cc" color={Colors.$grey50} />
            <SvgIcon name="man" color={Colors.$grey50} />
            <p
              className="subtitle2"
              style={{
                color: Colors.$grey50,
                maxWidth: "270px",
                marginLeft: "15px",
              }}
            >
              Использование материалов возможно с указанием активной ссылки на
              сайт.
            </p>
          </div>
          <div>
            <a href="/blog/" className="link">
              Что почитать
            </a>
            <a href="/pages/dashboard/" className="link">
              Статистика
            </a>
            <a href="/opendata/" className="link">
              Скачать данные
            </a>
            <a href="/pages/about/" className="link">
              О проекте
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
