import FloatingToolIcons from "@/components/FloatingToolIcons";
import ForcedVerification from "@/components/ForcedVerification";
import PopupAlertModal from "@/components/Popup/PopupAlertDialog";
import PopupAnnouncement from "@/components/Popup/PopupAnnouncement";
import PopupPromotion from "@/components/Popup/PopupPromotion";
import LiveChat from "@/components/Share/LiveChat";
import Loading from "@/components/UI/Loading";
import config from "@/config/config";
import { AuthContextProvider } from "@/contexts/authContext";
import { AuthDialogContextProvider } from "@/contexts/authDialogContext";
import { HeaderContextProvider } from "@/contexts/headerContext";
import { PageNameContextProvider } from "@/contexts/pageNameContext";
import { AuthGuard } from "@/domain/authentication/AuthGuard";
import ForgetPasswordDialog from "@/domain/authentication/ForgetPasswordDialog";
import LoginDialog from "@/domain/authentication/LoginDialog";
import RegisterDialog from "@/domain/authentication/RegisterDialog";
import { AppHistory } from "@/history/History";
import { useCheckRegisterProcess } from "@/hooks/app/useCheckRegisterProcess";
import { useHandleMaintenance } from "@/hooks/app/useHandleMaintenance";
import { useInitSite } from "@/hooks/app/useInitSite";
import { useLanguageDetect } from "@/hooks/app/useLanguageDetect";
import { usePopupInHomePage } from "@/hooks/app/usePopupInHomePage";
import { useUpdateProviderBalance } from "@/hooks/app/useUpdateProviderBalance";
import { useAuth } from "@/hooks/auth/useAuth";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import LayoutProvider from "@/layouts/LayoutProvider";
import { routes } from "@/router";
import ScrollToTop from "@/utils/ScrollToTop";
import React, { Suspense } from "react";
import { Redirect, Route, Router, Switch } from "react-router";

const App: React.FC = () => {
  const { general } = useGeneralStore();
  const { account } = useAccountStore();

  useLanguageDetect();
  useHandleMaintenance();
  useUpdateProviderBalance();
  useCheckRegisterProcess();
  const {
    needToShowPopupAnnouncement,
    needToShowPopupPromotion,
    isOpenAnnouncement,
    isShowPromotion,
    handleCloseAnnouncement,
    handleClosePromotion,
  } = usePopupInHomePage();

  const { isInitSiteLoading } = useInitSite();
  const { loginState, logoutState, registerState } = useAuth();

  const isAuthLoading =
    loginState.isLoading || logoutState.isLoading || registerState.isLoading;
  const isLoading =
    (isInitSiteLoading || !general.token || isAuthLoading) &&
    !general.isMaintenance;

  if (isLoading) {
    return <Loading show={true} opacity={1} noShrink={true} />;
  }

  return (
    <>
      <Router history={AppHistory}>
        <AuthContextProvider>
          <PageNameContextProvider>
            <HeaderContextProvider>
              <AuthDialogContextProvider>
                <ScrollToTop />
                <Switch>
                  {routes.map((route, index) => {
                    return (
                      <Route
                        exact
                        key={index}
                        path={route.path}
                        render={(props) => {
                          return (
                            <AuthGuard route={route}>
                              <LayoutProvider route={route}>
                                <Suspense
                                  fallback={
                                    <Loading
                                      show={true}
                                      opacity={1}
                                      noShrink={true}
                                    />
                                  }
                                >
                                  <route.component />
                                </Suspense>
                              </LayoutProvider>
                            </AuthGuard>
                          );
                        }}
                      />
                    );
                  })}
                  <Redirect to="/" />
                </Switch>

                <LiveChat
                  license={config.features.LiveChatVendor.license}
                  vendor={config.features.LiveChatVendor.brand}
                  group={
                    config.features.LiveChatVendor.group
                      ? config.features.LiveChatVendor.group
                      : "0"
                  }
                />

                {config.features.SMSVerification &&
                  account.registercompleted === false &&
                  config.features.ForcedVerification && (
                    <ForcedVerification forceVerify={true} />
                  )}

                {needToShowPopupAnnouncement && (
                  <PopupAnnouncement
                    open={isOpenAnnouncement}
                    onClose={handleCloseAnnouncement}
                  />
                )}
                {needToShowPopupPromotion && (
                  <PopupPromotion
                    open={isShowPromotion}
                    onClose={handleClosePromotion}
                  />
                )}

                <PopupAlertModal />
                <FloatingToolIcons />
                <LoginDialog />
                <RegisterDialog />
                <ForgetPasswordDialog />
              </AuthDialogContextProvider>
            </HeaderContextProvider>
          </PageNameContextProvider>
        </AuthContextProvider>
      </Router>

      <Loading show={isAuthLoading} noShrink={true} />
    </>
  );
};

export default App;
