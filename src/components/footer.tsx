import { faTelegram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import * as React from "react";

import { Colors } from "../styles/Colors";

export const Footer = () => {
  return (
    <footer>
      <div
        className="container"
        style={{
          overflow: "hidden",
          borderBottom: `1px solid rgba(24,51,74,0.1)`,
        }}
      >
        <div className="footer-wrap">
          <div>
            <Image
              src="/static/logo.png"
              alt="Лого сайта"
              width={167}
              height={25}
            />
            <p className="body1" style={{ marginTop: "18px" }}>
              Проект посвящен проблеме дорожно-транспортных происшествий в
              России. Цель проекта — повышение безопасности дорожного движения и
              снижение смертности в ДТП.
            </p>
          </div>

          <div>
            <h3 className="h3" style={{ marginBottom: "14px" }}>
              Сбор регулярных пожертвований на проект
            </h3>
            <div className="progress-wrap" style={{ marginBottom: "8px" }}>
              <div className="progress-bar" style={{ width: "65%" }} />
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
                <FontAwesomeIcon icon={faTelegram} color={Colors.$white} />
                <span className="body2">Карта ДТП в Телеграме</span>
              </a>
              <a href="https://twitter.com/dtp_stat" className="social-tw">
                <FontAwesomeIcon icon={faTwitter} color={Colors.$white} />
                <span className="body2">Карта ДТП в Твиттере</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="h3" style={{ marginBottom: "14px" }}>
              Наши партнёры
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 320,
              }}
            >
              <a
                href="https://city4people.ru/"
                aria-label="Городские проекты Ильи Варламова и Максима Каца"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                <Image
                  src="/static/gor.svg"
                  alt="Лого сайта"
                  width={150}
                  height={46}
                />
              </a>
              <a
                href="http://shtab.co/"
                aria-label="Штаб (центр городских проектов)"
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                <Image
                  src="/static/stab.svg"
                  alt="Лого сайта"
                  width={150}
                  height={27}
                />
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
            <p
              className="subtitle2"
              style={{
                color: Colors.$grey50,
                maxWidth: "430px",
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
            <a href="/opendata/" className="link">
              Скачать данные
            </a>
            <a href="/pages/about/" className="link">
              О проекте
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
