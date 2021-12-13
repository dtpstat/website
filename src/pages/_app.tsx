import "../styles/globals.css";

import { Provider } from "mobx-react";
import { AppProps } from "next/app";
import * as React from "react";

import { RootStore } from "../stores";

const rootStore = new RootStore();

const App: React.VoidFunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <Provider rootStore={rootStore}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
