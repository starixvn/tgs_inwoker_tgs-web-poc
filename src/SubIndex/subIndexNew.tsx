import React, { Suspense, useState } from "react";
import { Redirect, Route, Router, Switch } from "react-router";
import { AppHistory } from "@/history/History";
import config from "@/config/config";
import ForcedVerification from "../components/ForcedVerification";
import LiveChat from "../components/Share/live-chat";
import { routes } from "@/router";
import PopupAlertModal from "@/components/Popup/PopupAlertDialog";
import PopupAnnouncement from "@/components/Popup/PopupAnnouncement";
import PopupPromotion from "@/components/Popup/PopupPromotion";
import { AuthContextProvider } from "@/contexts/authContext";
import LayoutProvider from "@/layouts/LayoutProvider";
import { AuthGuard } from "@/domain/authentication/AuthGuard";
import FloatingToolIcons from "@/components/FloatingToolIcons";
import { PageNameContextProvider } from "@/contexts/pageNameContext";
import Loading from "@/components/UI/Loading";
import ScrollToTop from "@/utils/ScrollToTop";
import LoginDialog from "@/domain/authentication/LoginDialog";
import RegisterDialog from "@/domain/authentication/RegisterDialog";
import { HeaderContextProvider } from "@/contexts/headerContext";
import { AuthDialogContextProvider } from "@/contexts/authDialogContext";
import ForgetPasswordDialog from "@/domain/authentication/ForgetPasswordDialog";
import { useUiStore } from "@/hooks/stores/useUiStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useLanguageChange } from "@/hooks/app/useLanguageChange";
import { useHandleMaintenance } from "@/hooks/app/useHandleMaintenance";
import { useUpdateProviderBalance } from "@/hooks/app/useUpdateProviderBalance";
import { useCheckRegisterProcess } from "@/hooks/app/useCheckRegisterProcess";
import { usePopupInHomePage } from "@/hooks/app/usePopupInHomePage";
import { useInitSite } from "@/hooks/app/useInitSite";
import { useAuth } from "@/hooks/auth/useAuth";

const SubIndex: React.FC = () => {
  const { ui } = useUiStore();
  const { general } = useGeneralStore();
  const { account } = useAccountStore();

  useLanguageChange();
  useHandleMaintenance();
  useUpdateProviderBalance();
  useCheckRegisterProcess();
  const {
    showPopupAnnouncement,
    showPopupPromotion,
    openAnnouncement,
    showPromotion,
    handleCloseAnnouncement,
    handleClosePromotion,
  } = usePopupInHomePage();

  const { isInitSiteLoading } = useInitSite();
  const { loginState, logoutState, registerState } = useAuth();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");

  // PopupAlert
  const handleOpenPopupAlert = (
    title: string,
    message: string,
    action: string
  ) => {
    setTitle(title);
    setMessage(message);
    setOpen(true);
    setAction(action);
  };

  // componentDidUpdate

  const isAuthLoading =
    loginState.isLoading || logoutState.isLoading || registerState.isLoading;
  const isLoading =
    (isInitSiteLoading || !general.token || isAuthLoading) &&
    !general.isMaintenance;

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

                {(() => {
                  if (
                    config.features.LiveChatVendor.brand &&
                    config.features.LiveChatVendor.license
                  ) {
                    return (
                      <LiveChat
                        license={config.features.LiveChatVendor.license}
                        vendor={config.features.LiveChatVendor.brand}
                        group={
                          config.features.LiveChatVendor.group
                            ? config.features.LiveChatVendor.group
                            : 0
                        }
                      />
                    );
                  }
                })()}

                {config.features.SMSVerification &&
                  account.registercompleted === false &&
                  config.features.ForcedVerification && (
                    <>
                      <ForcedVerification
                        forcedverify={true}
                        alert={handleOpenPopupAlert}
                      />
                    </>
                  )}

                {showPopupAnnouncement && (
                  <PopupAnnouncement
                    open={openAnnouncement}
                    onClose={handleCloseAnnouncement}
                  />
                )}
                {showPopupPromotion && (
                  <PopupPromotion
                    open={showPromotion}
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
      <Loading show={isLoading} opacity={1} noShrink={true} />;
    </>
  );
};

export default SubIndex;
