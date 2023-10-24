import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import "./index.css";
import { isMobileOnly } from "react-device-detect";
import { Provider } from "react-redux";
import * as serviceWorker from "./utils/serviceWorker";
import {
  applyMiddleware,
  legacy_createStore as createStore,
  Store,
} from "redux";
import thunk from "redux-thunk";
import InterceptorService from "@/services/InterceptorService";
import { makeStyles, StylesProvider } from "@mui/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ClassNameMap, CombinedClassKey, SnackbarProvider } from "notistack";
import { composeWithDevTools } from "redux-devtools-extension";
import styled, {
  ThemeProvider as StyleComponentThemeProvider,
} from "styled-components";
import InfoPNG from "@/assets/images/info.png";
import SuccessPNG from "@/assets/images/success.png";
import DangerPNG from "@/assets/images/warning.png";
import rootReducer from "@/api-services/reducers/rootReducer";
import Config from "@/config/config";
import i18n from "@/utils/i18n";
import Main from "@/SubIndex/subIndexNew";
import { NotificationContextProvider } from "@/contexts/notificationContext";
import AudioPlayer from "./components/Share/audioplayer";
import FeatureGetter from "./components/Share/feature-getter";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { createRoot } from "react-dom/client";
import { muiTheme } from "@/theme/mui";
import { useLanguage } from "@/hooks/useLanguage";
import { RootState } from "@/types/stores/root";
import { Theme } from "@mui/system";

require("es6-promise").polyfill();

// TODO: hide on production
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
) as Store<RootState, ClassNameMap<CombinedClassKey>>;
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

const App = () => {
  const classes = useStyles();
  const { isLanguageReady } = useLanguage();

  if (isLanguageReady) {
    return (
      <Provider store={store}>
        <NotificationContextProvider>
          <FeatureGetter />
          {Config.features.BackgroundMusic && <AudioPlayer />}
          <StylesProvider injectFirst>
            <MuiThemeProvider theme={muiTheme as any}>
              <StyleComponentThemeProvider theme={theme}>
                <GlobalStyles />
                <SnackbarProvider
                  classes={
                    {
                      variantSuccess: classes.success,
                      variantError: classes.error,
                      variantWarning: classes.warning,
                      variantInfo: classes.info,
                    } as Partial<ClassNameMap<CombinedClassKey>>
                  }
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
                  <Main />
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
