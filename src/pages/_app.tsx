import "../styles/globals.css";
import "../components/inherited/dtp-map/src/scss/style.scss";

import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import * as React from "react";

import { UserProfileProvider } from "../providers/user-profile-provider";

const App: React.VoidFunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <UserProvider>
      <UserProfileProvider>
        <Component {...pageProps} />
      </UserProfileProvider>
    </UserProvider>
  );
};

export default App;
