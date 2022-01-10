export interface Theme {
  fontFamily: string;
}

export interface ThemeProps {
  theme: Theme;
}

export const mainTheme = {
  fontFamily:
    "Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
};

export const getTheme = ({ theme: themeProps }: ThemeProps) =>
  themeProps as Theme;
export const themeFontFamily = ({ theme: themeProps }: ThemeProps) =>
  themeProps.fontFamily;
