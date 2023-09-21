import React, { Suspense, useEffect } from "react";
import MobileLayout from "@/components/Mobile/layouts/mobileLayout";
import { Redirect, Route, Router, Switch } from "react-router";
import { AppHistory } from "@/history/History";
import { routes } from "@/components/Mobile/router";
import LoginDialog from "@/components/Mobile/components/auth/LoginDialog";
import RegisterDialog from "@/components/Mobile/components/auth/RegisterDialog";
import Loading from "@/components/Mobile/components/UI/Loading";
import PopupAnnouncement from "@/components/Mobile/components/Popup/PopupAnnouncement";
import { useInitSite } from "@/hooks/useInitSite";
import { AuthDialogContextProvider } from "@/contexts/authContext";
import { NotificationContextProvider } from "@/contexts/notificationContext";
import PopupAlertModal from "@/components/Mobile/components/Popup/PopupAlertDialog";
import { useNotifications } from "@/hooks/useNotifications";

type Props = {};
const Mobile = (props: Props) => {
  const { isLoading } = useInitSite();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AuthDialogContextProvider>
        <Router history={AppHistory}>
          <MobileLayout>
            <Switch>
              {routes.map((route, index) => {
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
        <PopupAlertModal />
      </AuthDialogContextProvider>
    </>
  );
};

export default Mobile;
