import React from "react";
import MobileLayout from "@/components/Mobile/layouts/mobileLayout";
import { Redirect, Route, Router, Switch } from "react-router";
import { AppHistory } from "@/history/History";
import { routes } from "@/components/Mobile/router";

type Props = {};
const Mobile = (props: Props) => {
  return (
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
  );
};

export default Mobile;
