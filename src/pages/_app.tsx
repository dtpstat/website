import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import * as React from "react";
import { ThemeProvider } from "styled-components";

import { UserProfileProvider } from "../providers/user-profile-provider";
import { GlobalStyles } from "../styles/global-styles";
import { mainTheme } from "../styles/main-theme";

const App: React.VoidFunctionComponent<AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <ThemeProvider theme={mainTheme}>
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
