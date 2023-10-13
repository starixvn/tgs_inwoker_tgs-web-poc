import { createTheme } from "@mui/material/styles";
import { themeList } from "@/theme/index";
import i18n from "@/utils/i18n";
import { fontFamily } from "@/theme/fontFamily";

var muiThemeMode = themeList["mobileT18"];
muiThemeMode.lang = i18n.language;

const muiTheme = createTheme({
  palette: {
    primary: {
      main: muiThemeMode.primary,
      mainGradient: muiThemeMode.primaryGradient,
    },
    secondary: {
      main: muiThemeMode.secondary,
    },
    tertiary: {
      main: muiThemeMode.tertiary,
    },
    type: "light",
    white: muiThemeMode.white,
    yellow: "#f4bd29",
    text: {
      primary: muiThemeMode.white,
      secondary: muiThemeMode.tertiaryLight,
    },
  },
  typography: {
    fontFamily: fontFamily,

    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  overrides: {
    MuiSelect: {
      root: {
        color: muiThemeMode.white,
      },
    },
  },
});

export { muiTheme };
