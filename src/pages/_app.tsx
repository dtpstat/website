import "../styles/globals.css";

import { inject, observer, Provider } from "mobx-react";
import { AppProps } from "next/app";
import * as React from "react";

import { RootStore } from "../stores";

const App: React.VoidFunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  const ComponentWithStore = inject(RootStore.storeName)(observer(Component));

  return (
    <Provider rootStore={RootStore}>
      <ComponentWithStore {...pageProps} />
    </Provider>
  );
};

export default App;
