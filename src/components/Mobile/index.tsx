import React, { useCallback, useEffect, useState } from "react";
import MobileLayout from "@/components/Mobile/layouts/mobileLayout";
import { Redirect, Route, Router, Switch } from "react-router";
import { AppHistory } from "@/history/History";
import { routes } from "@/components/Mobile/router";
import LoginDialog from "@/components/Mobile/components/auth/LoginDialog";
import RegisterDialog from "@/components/Mobile/components/auth/RegisterDialog";
import { useAccount } from "@/components/Mobile/hooks/useAccount";
import { useDispatch } from "react-redux";
import { accountAction } from "@/api-services/actions/accountAction";
import { useGeneral } from "@/components/Mobile/hooks/useGeneral";
import Loading from "@/components/Wap/components/Share/Loading";

type Props = {};
const Mobile = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { account } = useAccount();
  const { general } = useGeneral();

  const dispatch = useDispatch();

  const validateTokenState = async () => {
    const localStorageToken = localStorage.getItem("token1");

    const NEED_TO_REFRESH_TOKEN =
      localStorageToken != null &&
      account.token == null &&
      account.info.token === "";

    if (NEED_TO_REFRESH_TOKEN) {
      const responseToken = await dispatch(accountAction.checkTokenIsValid());
      if (!responseToken.IsSuccess) return;

      const response = await dispatch(accountAction.getAccountProfile(true));
      const bankInfoAuthentication = response.data?.bankinfoauthentication;
      const isPhoneNull = response.data.phone === null;
      const isEmailNull = response.data.email === null;
      const isRegisterCompleted = response.data.registercompleted;

      setIsLoading(false);
    }
  };
  useEffect(() => {
    validateTokenState().then();
  }, []);

  // const isSiteInitializing =
  //   (isLoading || general.token === "" || general.token === null) &&
  //   general.isMaintenance === false;

  if (isLoading) {
    return <Loading show={isLoading}></Loading>;
  }

  return (
    <>
      <MobileLayout>
        <Router history={AppHistory}>
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
                    return <route.component></route.component>;
                  }}
                />
              );
            })}{" "}
            <Redirect to="/" />
          </Switch>
        </Router>
      </MobileLayout>

      <LoginDialog />
      <RegisterDialog />
    </>
  );
};

export default Mobile;
