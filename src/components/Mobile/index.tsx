import React, { Suspense, useEffect, useState } from "react";
import MobileLayout from "@/components/Mobile/layouts/mobileLayout";
import { Redirect, Route, Router, Switch } from "react-router";
import { AppHistory } from "@/history/History";
import { routes } from "@/components/Mobile/router";
import LoginDialog from "@/components/Mobile/components/auth/LoginDialog";
import RegisterDialog from "@/components/Mobile/components/auth/RegisterDialog";
import { useAccountStore } from "@/components/Mobile/hooks/stores/useAccountStore";
import { useGeneralStore } from "@/components/Mobile/hooks/stores/useGeneralStore";
import Loading from "@/components/Mobile/components/UI/Loading";
import { useDispatch } from "react-redux";
import { accountAction } from "@/api-services/actions/accountAction";
import PopupAnnouncement from "@/components/Mobile/components/Popup/PopupAnnouncement";
import config from "@/config/config";
import { useHistory } from "react-router-dom";

type Props = {};
const Mobile = (props: Props) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const accountStore = useAccountStore();
  const generalStore = useGeneralStore();

  const dispatch = useDispatch();

  const validateTokenState = async () => {
    const localStorageToken = localStorage.getItem("token1");

    const NEED_TO_REFRESH_TOKEN =
      localStorageToken != null &&
      accountStore.account.token == null &&
      accountStore.account.info.token === "";

    if (NEED_TO_REFRESH_TOKEN) {
      const responseToken: any = await accountStore.checkTokenIsValid();
      if (!responseToken.IsSuccess) return;

      const response: any = await accountStore.getAccountProfile(true);

      const bankInfoAuthentication = response.data?.bankinfoauthentication;
      const isPhoneNull = response.data.phone === null;
      const isEmailNull = response.data.email === null;
      const isRegisterCompleted = response.data.registercompleted;

      if (config.features.ForceRedirectAddCard && !bankInfoAuthentication) {
        setIsLoading(false);
        if (isPhoneNull) {
          history.push({
            pathname: "/profile/phone",
            state: { forced: true },
          });
        } else if (isEmailNull) {
          history.push({
            pathname: "/profile/email",
            state: { forced: true },
          });
        } else if (!isRegisterCompleted) {
          history.push("/card/add");
        }
        return;
      }
    }

    generalStore.getSiteToken();
  };
  useEffect(() => {
    validateTokenState().then();
    setIsLoading(false);
  }, []);

  // const isSiteInitializing =
  //   (isLoading || general.token === "" || general.token === null) &&
  //   general.isMaintenance === false;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Router history={AppHistory}>
        <MobileLayout>
          <Switch>
            {routes.map((route, index) => {
              // add correspond method via config
              // let propsObj = {};
              // if (route.alert === true) {
              //   propsObj["alert"] = this.handleOpenPopupAlert;
              // }
              // if (route.navigate === true) {
              //   propsObj["navigate"] = this.handleNavigate;
              // }
              // if (route.popup === true) {
              //   propsObj["popup"] = this.handleOpenPopup;
              // }
              // if (route.screenHeight === true) {
              //   propsObj["screenHeight"] = this.props.screenHeight;
              // }
              // propsObj["GetSupportUrl"] = this.getSupportUrl;
              // propsObj["appHistory"] = AppHistory;
              // propsObj["brandComm"] = this.props.getBrandCommunicationList;

              return (
                <Route
                  exact
                  key={index}
                  path={route.path}
                  render={(props) => {
                    return (
                      <Suspense fallback={<Loading opacity={0} />}>
                        <route.component />;
                      </Suspense>
                    );
                  }}
                />
              );
            })}
            <Redirect to="/" />
          </Switch>
        </MobileLayout>
      </Router>

      <LoginDialog />
      <RegisterDialog />
      <PopupAnnouncement />
    </>
  );
};

export default Mobile;
