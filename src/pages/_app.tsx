import "../styles/globals.css";

import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import * as React from "react";

import { ApiProvider } from "../providers/api-provider";

const App: React.VoidFunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <ApiProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ApiProvider>
  );
};

export default App;
