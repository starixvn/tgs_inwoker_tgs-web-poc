import PopupAlertModal from "@/components/Mobile/components/Popup/PopupAlertDialog";
import PopupAnnouncement from "@/components/Mobile/components/Popup/PopupAnnouncement";
import Loading from "@/components/Mobile/components/UI/Loading";
import LoginDialog from "@/components/Mobile/components/auth/LoginDialog";
import RegisterDialog from "@/components/Mobile/components/auth/RegisterDialog";
import MobileLayout from "@/components/Mobile/layouts/mobileLayout";
import { routes } from "@/components/Mobile/router";
import { AuthDialogContextProvider } from "@/contexts/authContext";
import { AppHistory } from "@/history/History";
import { useInitSite } from "@/hooks/useInitSite";
import { Suspense } from "react";
import { Redirect, Route, Router, Switch } from "react-router";

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
                                                    <route.component />
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
