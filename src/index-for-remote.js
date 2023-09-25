import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { isMobileOnly } from "react-device-detect";
import { Provider } from "react-redux";
import * as serviceWorker from "./utils/serviceWorker";
import { applyMiddleware, createStore } from "redux";

import thunk from "redux-thunk";
import { makeStyles } from "@material-ui/core";
import {
  createTheme,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core/styles";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./api-services/reducers/rootReducer";
import Config from "./config/config";
import i18n from "./utils/i18n";

import { ThemeProvider } from "styled-components";
import AudioPlayer from "./components/Share/audioplayer";
import { GlobalStyles } from "./global";
import { themeList } from "./theme";
import Mobile from "@/components/Mobile";
import { AuthDialogContextProvider } from "@/contexts/authDialogContext";

require("es6-promise").polyfill();

// TODO: hide on production
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const useStyles = makeStyles((theme) => ({
  success: { backgroundColor: "#fff", color: "#000" },
  error: { backgroundColor: "#fff", color: "#000" },
  warning: { backgroundColor: "#fff", color: "#000" },
  info: { backgroundColor: "#fff", color: "#000" },
}));

Config.from = isMobileOnly ? "h5" : "h5";
Config.isPC = isMobileOnly ? 1 : 0;

var fontFamily = "Tahoma, Helvetica, Arial, sans-serif";
if (i18n.language === "zh-CN") {
  fontFamily =
    "'Noto Sans SC', Microsoft Yahei, '微软雅黑', STXihei, '华文细黑'";
} else if (i18n.language === "zh-TW") {
  fontFamily =
    "'Noto Sans TC', Tahoma, Helvetica, Arial, sans-serif, '微軟正黑粗'";
} else if (i18n.language === "th-TH") {
  fontFamily = "'Sarabun', sans-serif";
}
document.getElementById("root").style.fontFamily = fontFamily;
var muiThemeMode = isMobileOnly
  ? themeList[Config.brand] || themeList[Config.theme]
  : themeList[Config.theme];
muiThemeMode.lang = i18n.language;
const muiTheme = createTheme({
  palette: {
    primary: {
      main: muiThemeMode.primary,
      mainRgb: muiThemeMode.primaryRgb,
      contrastText: muiThemeMode.primaryText,
      mainGradient: muiThemeMode.primaryGradient,
      mainGradientRgb: muiThemeMode.primaryGradientRgb,
    },
    secondary: {
      main: muiThemeMode.secondary,
      contrastText: muiThemeMode.secondaryText,
    },
    tertiary: {
      main: muiThemeMode.tertiary,
      contrastText: muiThemeMode.tertiaryText,
    },
    type: "light",
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
        color: muiThemeMode.secondary,
      },
    },
    MuiTabs: {
      // Name of the rule
      root: {
        backgroundColor: muiThemeMode.secondary,
        height: "74px",
        overflow: "visible",
        "& .MuiTabs-indicator": {
          backgroundColor: "#FDE740",
          height: "5px",
        },
        "& .MuiTabs-indicator:before": {
          content: "'\\A'",
          borderStyle: "solid",
          borderWidth: "0 10px 10px 10px",
          borderColor: "transparent transparent #FDE740 transparent",
          position: "absolute",
          left: "50%",
          top: "-6px",
          transform: "translateX(-50%)",
        },
        "& .MuiTabs-flexContainer": {
          overflow: "visible",
        },
        "& .MuiTabs-scrollButtons": {
          display: "none",
        },
      },
    },
    MuiTab: {
      root: {
        fontSize: "24px",
        maxWidth: "375px",
        color: "#ffffff !important",
        minWidth: "210px",
        height: "64px",
        "&.Mui-selected": {
          color: "#FDE740  !important",
        },
      },
    },
  },
});
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <AuthDialogContextProvider>
        {Config.features.BackgroundMusic && <AudioPlayer />}
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={muiTheme}>
            <ThemeProvider theme={muiThemeMode}>
              <GlobalStyles />
              <Mobile />
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </AuthDialogContextProvider>
    </Provider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
