import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import * as serviceWorker from "./utils/serviceWorker";
import {
  applyMiddleware,
  legacy_createStore as createStore,
  Store,
} from "redux";
import thunk from "redux-thunk";
import InterceptorService from "@/services/InterceptorService";
import { StylesProvider } from "@mui/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { composeWithDevTools } from "redux-devtools-extension";
import { ThemeProvider as StyleComponentThemeProvider } from "styled-components";
import rootReducer from "@/api-services/reducers/rootReducer";
import i18n from "@/utils/i18n";
import App from "@/App";
import { NotificationContextProvider } from "@/contexts/notificationContext";
import AudioPlayer from "./components/Share/audioplayer";
import FeatureGetter from "./components/Share/feature-getter";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { createRoot } from "react-dom/client";
import { muiTheme } from "@/theme/mui";
import { useLanguage } from "@/hooks/useLanguage";
import Config from "@/config/config";
import StyledSnakeBarProvider from "@/components/UI/StyledSnakeBarProvider";
import Loading from "@/components/UI/Loading";
import { useTokenVerify } from "@/hooks/app/useTokenVerify";

require("es6-promise").polyfill();

// TODO: hide on production
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
) as Store<any>;
InterceptorService.setupInterceptors(store);

document.getElementById("title").innerHTML = i18n
  .t("common.title")
  .replace(/{brand}/g, Config.brandName);
document
  .getElementById("description")
  .setAttribute(
    "content",
    i18n.t("common.title").replace(/{brand}/g, Config.brandName)
  );

const AppWrapper = () => {
  const { isLanguageReady } = useLanguage();
  const { isTokenVerified } = useTokenVerify();

  if (!isLanguageReady || !isTokenVerified) {
    return <Loading show={true} opacity={1} noShrink={true} />;
  }

  return (
    <NotificationContextProvider>
      <FeatureGetter />
      {Config.features.BackgroundMusic && <AudioPlayer />}

      <StylesProvider injectFirst>
        <MuiThemeProvider theme={muiTheme as any}>
          <StyleComponentThemeProvider theme={theme}>
            <GlobalStyles />
            <StyledSnakeBarProvider>
              <App />
            </StyledSnakeBarProvider>
          </StyleComponentThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </NotificationContextProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
