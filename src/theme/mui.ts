import { createTheme } from "@mui/material/styles";
import { theme } from "@/theme/index";
import i18n from "@/utils/i18n";
import { fontFamily } from "@/theme/fontFamily";

theme.lang = i18n.language;

declare module "@mui/material/styles" {
  interface Theme {
    tertiaryDark: string;
    white: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    tertiaryDark: string;
    white: string;
  }
}

const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.primary,
      mainGradient: theme.primaryGradient,
    },
    secondary: {
      main: theme.secondary,
    },
    tertiary: {
      main: theme.tertiary,
      dark: theme.tertiaryDark,
      light: theme.tertiaryLight,
    },
    type: "light",
    white: theme.white,
    yellow: "#f4bd29",
    text: {
      primary: theme.white,
      secondary: theme.tertiaryLight,
    },
  },
  typography: {
    fontFamily: fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    button: {
      textTransform: "none",
    },
  },
  overrides: {
    MuiSelect: {
      color: theme.white,
    },
  },
});

export { muiTheme };
