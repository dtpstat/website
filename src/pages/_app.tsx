import "../styles/globals.css";

import { AppProps } from "next/app";
import * as React from "react";

const App: React.VoidFunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
};

export default App;
