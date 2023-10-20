import { createTheme } from "@mui/material/styles";
import { theme } from "@/theme/index";
import i18n from "@/utils/i18n";
import { fontFamily } from "@/theme/fontFamily";
import { breakpoints } from "@/theme/breakpoints";

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
  breakpoints: {
    values: {
      xs: breakpoints.xs,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
  },
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
  components: {
    MuiTablePagination: {
      styleOverrides: {
        actions: {
          "& .MuiButtonBase-root": {
            color: "#707070",
            "&:hover": {
              // backgroundColor: "#your_hover_color_here", // 设置鼠标悬停时的背景颜色
            },
          },
        },
      },
    },
  },
});

export { muiTheme };
