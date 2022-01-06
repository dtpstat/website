import "../styles/globals.css";
import "../styles/scss/style.scss";

import { UserProvider } from "@auth0/nextjs-auth0";
import { AppProps } from "next/app";
import * as React from "react";
import { Provider } from "react-redux";

import { store } from "../store/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
};

export default App;
