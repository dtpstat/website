import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: string;
  }
}

export interface Theme {
  fontFamily: string;
}

export interface ThemeProps {
  theme: Theme;
}

export const defaultTheme: DefaultTheme = {
  fontFamily:
    "Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
};
