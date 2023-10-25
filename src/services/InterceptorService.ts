import axios, { AxiosRequestConfig } from "axios";
import { UNAUTHORIZE } from "@/api-services/constant/actionType";
import { AppHistory } from "@/history/History";
import i18n from "@/utils/i18n";
import { isMobileOnly } from "react-device-detect";
import ErrorSwitcher from "@/utils/ErrorSwitcher";

const Interceptor = {
  setupInterceptors: (store: any) => {
    // Add a response interceptor
    axios.interceptors.request.use(
      function (config: AxiosRequestConfig) {
        const client = localStorage.getItem("client-token");
        if (client != null && client !== "") {
          config.headers["Authorization"] = "bearer " + client;
        }

        const token =
          localStorage.getItem("token1") || localStorage.getItem("token0");
        const logintime =
          localStorage.getItem("logintime1") ||
          localStorage.getItem("logintime0");

        if (token != null && token !== "") {
          if (logintime != null && logintime !== "") {
            var date = new Date(parseInt(logintime, 10 | 0));
            date = new Date(new Date(date).setHours(date.getHours() + 11));
            var newD = new Date(date.getTime() + 50 * 60000);
            var currentDate = new Date();
            if (currentDate < newD) {
              config.headers["Token"] = token;
            }
          }
        }

        config.headers["Content-Type"] = "application/json";
        config.headers["Accept-Language"] = localStorage.getItem("i18nextLng");

        if (
          config.url &&
          config.url.toUpperCase().includes("/GAMEPROVIDER/LIST")
        ) {
          config.headers["Token"] = "";
        }

        return config;
      },
      function (error: any) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response: any) {
        var newResponse: any = {
          IsSuccess: false,
          info: ErrorSwitcher.getTranslation(response.data.errmsgid),
          code: response.data.err,
          data:
            response.data.data !== null &&
            typeof response.data.data !== "undefined"
              ? response.data.data
              : response.data,
        };

        if (response.data.url) {
          newResponse.data.url = response.data.url;
        }
        if (response.data.items) {
          newResponse.data = response.data;
          newResponse.IsSuccess = true;
        }
        if (response.data.token) {
          newResponse.data.token = response.data.token;
        }

        // after call login api, save res(token) to localStorage
        if (
          response.config.url &&
          response.config.url.toUpperCase().includes("/API/PLAYER/LOGIN")
        ) {
          localStorage.setItem("token0", response.data.token);
          localStorage.setItem("token1", response.data.token);
          localStorage.setItem("logintime0", response.data.logintime);
          localStorage.setItem("logintime1", response.data.logintime);
        }

        // after call logout api, delete token saved in localStorage
        if (
          response.config.url &&
          response.config.url.toUpperCase().includes("/API/PLAYER/LOGOUT")
        ) {
          localStorage.removeItem("token0");
          localStorage.removeItem("token1");
          localStorage.removeItem("logintime0");
          localStorage.removeItem("logintime1");
        }
        if (
          response.config.url &&
          response.config.url.toUpperCase().includes("/BANK/HELP2PAY/PAY")
        ) {
          newResponse.IsSuccess = true;
        }
        if (newResponse.code === 0) {
          newResponse.IsSuccess = true;
        } else if (
          newResponse.code === 102 ||
          newResponse.code === 101 ||
          newResponse.code === 210
        ) {
          localStorage.removeItem("token0");
          localStorage.removeItem("token1");
          localStorage.removeItem("logintime0");
          localStorage.removeItem("logintime1");
          store.dispatch({ type: UNAUTHORIZE });

          if (newResponse.code === 210) {
            AppHistory.replace(`/banned`);
          }
          // else {
          //   AppHistory.replace(`/`);
          // }
        }

        return newResponse;
      },
      function (error: any) {
        if (error.response) {
          if (
            error.response.data.err == 102 ||
            error.response.data.err == 101 ||
            error.response.data.err == 210 ||
            error.response.data.errmsg ===
              "request platform is not matched with player login platform."
          ) {
            if (
              error.response.config.url.indexOf("Player/Login") < 0 &&
              error.response.config.url.indexOf("player/password") < 0 &&
              error.response.config.url.indexOf("player/init-phone") < 0
            ) {
              localStorage.removeItem("token0");
              localStorage.removeItem("token1");
              localStorage.removeItem("logintime0");
              localStorage.removeItem("logintime1");
              store.dispatch({ type: UNAUTHORIZE });

              if (error.response.data.err == 210) {
                AppHistory.replace(`/banned`);
              }
              // else {
              //   AppHistory.replace(`/`);
              // }
            }
          }

          return {
            IsSuccess: false,
            info: ErrorSwitcher.getTranslation(error.response.data.errmsgid),
            code: error.response.data.err,
            data: error.response.data,
          };
        } else {
          return {
            IsSuccess: false,
            info: "Internal Server Error",
            code: "",
            data: {},
          };
        }
      }
    );
  },
};

export default Interceptor;
