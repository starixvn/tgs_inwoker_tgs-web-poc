import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { useEffect } from "react";
import "./index.css";
import { isMobileOnly } from "react-device-detect";
import { Provider } from "react-redux";
import * as serviceWorker from "./utils/serviceWorker";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import InterceptorService from "./api-services/services/InterceptorService";
import { makeStyles, StylesProvider } from "@mui/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { composeWithDevTools } from "redux-devtools-extension";
import styled, {
  ThemeProvider as StyleComponentThemeProvider,
} from "styled-components";
import InfoPNG from "../src/assets/images/info.png";
import SuccessPNG from "../src/assets/images/success.png";
import DangerPNG from "../src/assets/images/warning.png";
import rootReducer from "./api-services/reducers/rootReducer";
import Config from "./config/config";
import config from "./config/config";
import i18n from "./utils/i18n";
import Main from "@/components/Main";
import { NotificationContextProvider } from "@/contexts/notificationContext";
import AudioPlayer from "./components/Share/audioplayer";
import FeatureGetter from "./components/Share/feature-getter";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { createRoot } from "react-dom/client";
import { Redirect, Route, Router, Switch } from "react-router";
import { AppHistory } from "@/history/History";
import { muiTheme } from "@/theme/mui";
import { HeaderContextProvider } from "@/contexts/headerContext";

require("es6-promise").polyfill();

// TODO: hide on production
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
InterceptorService.setupInterceptors(store);
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

const useStyles = makeStyles((theme) => ({
  success: { backgroundColor: "#fff", color: "#000" },
  error: { backgroundColor: "#fff", color: "#000" },
  warning: { backgroundColor: "#fff", color: "#000" },
  info: { backgroundColor: "#fff", color: "#000" },
}));

const Dismiss = styled.a`
  margin-right: 12px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.img`
  width: 24px;
  margin-right: 12px;
`;

Config.from = isMobileOnly ? "h5" : "h5";
Config.isPC = isMobileOnly ? 1 : 0;

document.getElementById("title").innerHTML = i18n
  .t("common.title")
  .replace(/{brand}/g, Config.brandName);
document
  .getElementById("description")
  .setAttribute(
    "content",
    i18n.t("common.title").replace(/{brand}/g, Config.brandName)
  );
// if (
//   process.env.REACT_APP_CUSTOM_NODE_ENV !== "development" &&
//   (process.env.REACT_APP_CUSTOM_NODE_ENV !== "qa" || Config.baseUrl === "") &&
//   (process.env.REACT_APP_CUSTOM_NODE_ENV !== "staging" || Config.baseUrl === "")
// ) {
//   let url = window.location.hostname;
//   let new_sub = "service";
//   let baseUrl = "";
//   if (url.split(/[\/\.]+/).length >= 3) {
//     baseUrl = url.replace(url.split(/[\/\.]+/)[0], new_sub);
//   } else {
//     baseUrl = new_sub + "." + url;
//   }
//   baseUrl = window.location.protocol + "//" + baseUrl + "/";
//   Config.baseUrl = baseUrl;
// }

const App = () => {
  const classes = useStyles();
  const languageDetector =
    i18n.language ||
    localStorage.getItem("i18nextLng") ||
    config.defaultLanguage;
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      document.getElementById("title").innerHTML = i18n
        .t("common.title")
        .replace(/{brand}/g, Config.brandName);
      document
        .getElementById("description")
        .setAttribute(
          "content",
          i18n.t("common.title").replace(/{brand}/g, Config.brandName)
        );
    });

    i18n.on("loaded", function (options) {
      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    var languages = "zh-CN|zh-TW|en-US|id-ID|th-TH|vi-VN".split("|");
    var pathname = window.location.pathname;
    var isfoundLanguage = "";
    for (var i = 0; i < languages.length; i++) {
      if (pathname.indexOf(languages[i]) >= 0) {
        isfoundLanguage = languages[i];
        break;
      }
    }
    if (isfoundLanguage != "") {
      pathname = pathname.replace("/" + isfoundLanguage, "/");
      pathname = pathname.replace("//", "/");
      window.location.href = pathname + window.location.search;
    }
  }, []);

  if (isReady) {
    return (
      <Provider store={store}>
        <NotificationContextProvider>
          <FeatureGetter />
          {Config.features.BackgroundMusic && <AudioPlayer />}
          <StylesProvider injectFirst>
            <MuiThemeProvider theme={muiTheme}>
              <StyleComponentThemeProvider theme={theme}>
                <GlobalStyles />
                <SnackbarProvider
                  classes={{
                    variantSuccess: classes.success,
                    variantError: classes.error,
                    variantWarning: classes.warning,
                    variantInfo: classes.info,
                  }}
                  iconVariant={{
                    success: <Icon src={SuccessPNG}></Icon>,
                    error: <Icon src={DangerPNG}></Icon>,
                    warning: <Icon src={DangerPNG}></Icon>,
                    info: <Icon src={InfoPNG}></Icon>,
                  }}
                  action={(key) => (
                    <Dismiss onClick={onClickDismiss(key)}>x</Dismiss>
                  )}
                  maxSnack={3}
                  autoHideDuration={3000}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  ref={notistackRef}
                >
                  <HeaderContextProvider>
                    <Router history={AppHistory}>
                      <Switch>
                        <Route path={"/"} render={(props) => <Main />} />
                        <Redirect to={`/`} />
                      </Switch>
                    </Router>
                  </HeaderContextProvider>
                </SnackbarProvider>
              </StyleComponentThemeProvider>
            </MuiThemeProvider>
          </StylesProvider>
        </NotificationContextProvider>
      </Provider>
    );
  } else {
    return null;
  }
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
