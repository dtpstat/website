import "../components/inherited/dtp-map/src/scss/style.scss";

import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import * as React from "react";
import { ThemeProvider } from "styled-components";

import { UserProfileProvider } from "../providers/user-profile-provider";
import { defaultTheme } from "../styles/default-theme";
import { GlobalStyles } from "../styles/global-styles";

const App: React.VoidFunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <UserProvider>
        <UserProfileProvider>
          <Component {...pageProps} />
        </UserProfileProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
