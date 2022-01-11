import "./scss/style.scss";

import * as Sentry from "@sentry/browser";
import config from "config";
import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: config.SENTRY_URL,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector("#root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
