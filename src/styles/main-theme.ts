export interface Theme {
  theme: {
    fontFamily: string;
  };
}

export const mainTheme = {
  fontFamily:
    "Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
};

export const themeFontFamily = ({ theme }: Theme) => theme.fontFamily;
