import { createGlobalStyle } from "styled-components";

import { Theme } from "./main-theme";

export const GlobalStyles = createGlobalStyle`
    html, body {
        padding: 0;
        margin: 0;
        font-family: ${({ theme }: Theme) => theme.fontFamily};
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }
  `;
