import "../styles/inherited-scss/style.scss";

import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import * as React from "react";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "../styles/default-theme";
import { GlobalStyles } from "../styles/global-styles";

const App: React.VoidFunctionComponent<AppProps & { err: Error }> = ({
  Component,
  pageProps,
  err,
}) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <UserProvider>
        {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
        <Component {...pageProps} err={err} />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
