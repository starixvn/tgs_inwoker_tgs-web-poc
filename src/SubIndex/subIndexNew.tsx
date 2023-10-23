import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router";
import { AppHistory } from "@/history/History";
import { SHOW_LOGIN } from "@/api-services/constant/actionType";
import { uiAction } from "@/api-services/actions/uiAction";
import { gameAction } from "@/api-services/actions/gameAction";
import { generalAction } from "@/api-services/actions/generalAction";
import { walletAction } from "@/api-services/actions/walletAction";
import { accountAction } from "@/api-services/actions/accountAction";
import { inboxAction } from "@/api-services/actions/inboxAction";
import { GeneralService } from "@/api-services/services/GeneralService";
import config from "@/config/config";
import ErrorSwitcher from "@/utils/ErrorSwitcher";
import i18n from "@/utils/i18n";
import BlowFishEncryption from "@/utils/BlowFishEncryption";
import Common from "@/utils/Common";
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
import { useGameStore } from "@/hooks/stores/useGameStore";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

const SubIndex: React.FC = (props: any) => {
  const { ui } = useUiStore();
  const { general } = useGeneralStore();
  const { game } = useGameStore();
  const { account } = useAccountStore();

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");

  const [openAnnouncement, setOpenAnnouncement] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

  const init = async () => {
    Common.loadScript("/js/config.js", () => {
      Common.loadScript("/js/iovation.js", () => {});
    });
    saveUrlInfoToLocalStorage();
    await handleSiteDataFetching();
    handleGoto();
    handleTo();
    await handleAccountDataFetching();
    setLoading(false);
  };
  useEffect(() => {
    init();

    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const saveUrlInfoToLocalStorage = () => {
    const urlPath = window.location.pathname.split("/");

    if (urlPath.length !== 3) {
      localStorage.setItem("invitationtype", "");
      localStorage.setItem("upper", "");
      localStorage.setItem("promotionId", "");
      return;
    }

    if (urlPath[1] === "a") {
      localStorage.setItem("promotionId", urlPath[2] || "");
      localStorage.setItem("upper", "");
      localStorage.setItem("invitationtype", "a");
    }

    if (urlPath[1] === "p") {
      localStorage.setItem("upper", urlPath[2] || "");
      localStorage.setItem("promotionId", "");
      localStorage.setItem("invitationtype", "p");
    }
  };

  const handleGoto = () => {
    let urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("goto")) return;

    const gotoValue = urlParams.get("goto");
    if (gotoValue) {
      window.location.href = gotoValue;
    }
  };

  const handleTo = () => {
    let urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("do")) return;

    const doValue = urlParams.get("do");
    switch (doValue) {
      case "login":
      case "logout":
      case "register":
      case "login_auth":
      case "register_auth":
        localStorage.removeItem("token1");
        break;

      case "login_token":
        const decryptedToken = BlowFishEncryption.Decrypt(
          urlParams.get("token")
        );

        localStorage.setItem("token1", decryptedToken);
        AppHistory.replace("/");
        break;

      default:
        return "";
    }
  };

  const handleSiteDataFetching = async () => {
    if (!general.token) {
      props.getSiteToken();
      return;
    }

    props.getBrandLanguage();
    props.getMarquee(i18n.language);
    props.getAnnouncement(i18n.language);
    props.getBanner();
    props.getBrand();
    props.getBrandCommunicationList();
    props.getLiveChatURL();
    props.getPromotion();
    props.getDepositMethod();
    props.getWithdrawalChannel();
    props.getAffiliateStatus();
  };

  const handleAccountDataFetching = async () => {
    const localStorageToken = localStorage.getItem("token1");

    const isNeedToRestoreAccountData =
      !!localStorageToken && !account.token && !account.info.token;
    if (!isNeedToRestoreAccountData) return;

    const responseToken = await props.checkTokenIsValid(localStorageToken);
    if (!responseToken.IsSuccess) return;

    const getMemberInfoRes = await props.getAccountProfile(true);
    let bankInfoAuthentication = getMemberInfoRes.data.bankinfoauthentication;
    let isPhoneNull = !getMemberInfoRes.data.phone;
    let isEmailNull = !getMemberInfoRes.data.email;
    let isRegisterCompleted = getMemberInfoRes.data.registercompleted;

    if (config.features.ForceRedirectAddCard && !bankInfoAuthentication) {
      setLoading(false);
      if (isPhoneNull) {
        AppHistory.push({
          pathname: "/profile/phone",
          state: { forced: true },
        });
      }

      if (isEmailNull) {
        AppHistory.push({
          pathname: "/profile/email",
          state: { forced: true },
        });
      }

      if (!isRegisterCompleted) {
        AppHistory.push("/card/add");
      }

      return;
    }

    props.getBalanceList();
    handleUpdateProviderBalance();
    props.getMessageList(i18n.language, 1, 99);
    props.getBankCardList();
    props.getAutoTransferStatus();
    props.getDepositMethod();
    props.getWithdrawalChannel();
    props.getPromotionRouletteCount();
  };

  const onFocus = () => {
    if (!account.token) return;

    props.getBalanceList();
  };

  const handleLoginTokenChanged = () => {
    if (!general.token) {
      props.getSiteToken();
      props.getPromotion();
      return;
    }

    localStorage.setItem("client-token", general.token);

    GeneralService.GetLocalization().then((response) => {
      if (response.IsSuccess) {
        ErrorSwitcher.setTranslation(response.data);
      }
    });

    props.getHomePageGameList();
    props.getBrandLanguage();
    props.getMarquee(i18n.language);
    props.getAnnouncement(i18n.language);
    props.getBanner();
    props.getBrand();
    props.getBrandCommunicationList();
    props.getLiveChatURL();
    props.getPromotion();
    props.getAffiliateStatus();
  };

  const handleUpdateProviderBalance = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !account.info.bankInfoAuthentication
    )
      return;

    // update provider's game balance
    game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter(
        (item) => item.abbreviation !== "NTTF" && item.abbreviation !== "RTTF"
      )
      .map((a) => {
        props.getGameBalance(a.abbreviation);
      });
  };

  const handleUm = () => {
    if (general.isMaintenance) {
      AppHistory.push("/maintenance");
    }
  };

  const handleLanguageChanged = () => {
    const { brandLanguage } = general;
    const currentLanguage = i18n.language;
    const pathParts = window.location.pathname.split("/");

    if (!brandLanguage.length) return;

    const isLanguageInBrand = brandLanguage.some(
      (lang) => lang.culturecode === currentLanguage
    );

    if (isLanguageInBrand) {
      if (!(pathParts[1] !== currentLanguage || pathParts.length > 3)) return;
      i18n.changeLanguage(currentLanguage);
    } else {
      const newLanguage = brandLanguage[0].culturecode;
      i18n.changeLanguage(newLanguage);
      window.location.reload();
    }
  };

  const handleRegister = () => {
    if (
      account.registercompleted === false &&
      config.features.Register_ShowPhone &&
      config.features.ForcedVerification
    ) {
      AppHistory.push({
        pathname: "/profile/phone",
        state: { forced: true },
      });
    }
  };

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

  const handleCloseAudio = () => {
    if (document.getElementById("audio") != null)
      document.getElementById("audio").play();
  };

  const handleCloseAnnouncement = () => {
    setOpenAnnouncement(false);
    setShowPromotion(true);
    handleCloseAudio();
  };

  const handleClosePromotion = () => {
    setShowPromotion(false);
    handleCloseAudio();
  };

  const matchingPath =
    window.location.pathname === "/" ||
    window.location.pathname === "/main/home";

  const showPopupAnnouncement =
    config.features.PopupAnnouncement &&
    ui.mains &&
    ui.mains.length > 0 &&
    matchingPath;

  const showPopupPromotion =
    config.features.PopupPromotion && general.promotionList.items.length > 0;

  // componentDidUpdate
  useEffect(() => {
    // popup announcement logic
    const isInHomePage = ui.mains && ui.mains.length > 0;

    if (config.features.PopupAnnouncement) {
      if (isInHomePage) {
        setOpenAnnouncement(true);
        setShowPromotion(false);
      }
    }

    // popup promotion logic
    if (config.features.PopupPromotion) {
      if (isInHomePage && general.promotionList.items.length > 0) {
        if (!openAnnouncement) {
          setShowPromotion(true);
        }
      }
    }
  }, [ui.mains, general.promotionList.items]);

  useEffect(() => {
    handleLoginTokenChanged();
  }, [general.token]);

  useEffect(() => {
    if (account.token) {
      this.handleUpdateProviderBalance();
    }
  }, [game.providerList]);

  useEffect(() => {
    // UM
    handleUm();
  }, [general.isMaintenance]);

  useEffect(() => {
    // language changed
    handleLanguageChanged();
  }, [general.brandLanguage]);

  useEffect(() => {
    // register is not completed
    handleRegister();
  }, [account.registercompleted]);

  if (
    (loading || general.token === "" || general.token === null) &&
    !general.isMaintenance
  ) {
    return <Loading show={loading} opacity={1} />;
  } else {
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
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
    game: state.game,
    ui: state.ui,
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },

    getAccountProfile: (showVip) =>
      dispatch(accountAction.getAccountProfile(showVip)),
    getMobilePrefix: () => dispatch(generalAction.getMobilePrefix()),
    checkTokenIsValid: () => dispatch(accountAction.checkTokenIsValid()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    getBrand: () => dispatch(generalAction.getBrand()),
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getHomePageGameList: () => dispatch(gameAction.getHomePageGameList()),
    getSiteToken: () => dispatch(generalAction.getSiteToken()),
    getMessageList: (language, pages, limit) =>
      dispatch(inboxAction.getMessages(language, pages, limit, true, true)),
    getBrandCommunicationList: (language) =>
      dispatch(generalAction.getBrandCommunication()),
    getBrandLanguage: () => dispatch(generalAction.getBrandLanguage()),

    getBanner: () => {
      dispatch(generalAction.getBanner());
    },
    getLiveChatURL: () => dispatch(generalAction.getLiveChatURL()),
    getAutoTransferStatus: () => dispatch(walletAction.getAutoTransferStatus()),
    //TODO: Revert the 4th param to true after testing.
    getPromotionList: (language) =>
      dispatch(
        generalAction.getPromotionList(language, 1, 99, false, "", true)
      ),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    getDepositMethod: () => dispatch(walletAction.getDepositMethod()),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    getPromotion: () => dispatch(generalAction.getPromotion()),
    getPromotionRouletteCount: () =>
      dispatch(generalAction.getPromotionRouletteCount()),
    getAffiliateStatus: () => dispatch(generalAction.getAffiliateStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubIndex);
