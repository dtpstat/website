import { createGlobalStyle } from "styled-components";

import { themeFontFamily } from "./main-theme";

export const GlobalStyles = createGlobalStyle`
    html, body {
        padding: 0;
        margin: 0;
        font-family: ${themeFontFamily};
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }
  `;
