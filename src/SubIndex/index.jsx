import React, { Component, Suspense } from "react";
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

class SubIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCS: false,
      isIpRestrict: false,
      loading: true,
      // PopupAlert
      open: false,
      title: "",
      message: "",
      action: "",
      // Popup
      openAnnouncement: false,
      showPromotion: false,
    };
  }

  getSupportUrl = (userid, name, question, email) => {
    if (config.features.LiveChatVendor.brand === "zendesk") {
      window.zE("webWidget", "open");
      return;
    } else if (config.features.LiveChatVendor.brand === "livechat") {
      window.LiveChatWidget.call("maximize");
      return;
    }

    const newURL = this.props.general.livechat
      ? this.props.general.livechat.setting.url
          .replace("{name}", name)
          .replace("{lang}", i18n.language)
          .replace("{email}", email || "")
      : "";

    if (!newURL.length) return;
    window.open(newURL, "_blank");
  };

  // =========================
  saveUrlInfoToLocalStorage() {
    const urlPath = window.location.pathname.split("/");

    if (urlPath.length !== 3) {
      localStorage.setItem("invitationtype", "");
      localStorage.setItem("upper", ""); //reset
      localStorage.setItem("promotionId", ""); //reset
      return;
    }

    if (urlPath[1] === "a") {
      localStorage.setItem("promotionId", urlPath[2] || "");
      localStorage.setItem("upper", ""); //reset
      localStorage.setItem("invitationtype", "a");
    }

    if (urlPath[1] === "p") {
      localStorage.setItem("upper", urlPath[2] || "");
      localStorage.setItem("promotionId", ""); //reset
      localStorage.setItem("invitationtype", "p");
    }
  }

  handleGoto() {
    let urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("goto")) return;

    const gotoValue = urlParams.get("goto");
    if (gotoValue) {
      window.location.href = gotoValue;
    }
  }

  handleTo() {
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
  }

  async handleSiteDataFetching() {
    if (!this.props.general.token) {
      this.props.getSiteToken();
      return;
    }

    this.props.getBrandLanguage();
    this.props.getMarquee(i18n.language);
    this.props.getAnnouncement(i18n.language);
    this.props.getBanner();
    this.props.getBrand();
    this.props.getBrandCommunicationList();
    this.props.getLiveChatURL();
    this.props.getPromotion();
    this.props.getDepositMethod();
    this.props.getWithdrawalChannel();
    this.props.getAffiliateStatus();
  }

  async handleAccountDataFetching() {
    const localStorageToken = localStorage.getItem("token1");

    const isNeedToRestoreAccountData =
      !!localStorageToken &&
      !this.props.account.token &&
      !this.props.account.info.token;
    if (!isNeedToRestoreAccountData) return;

    const responseToken = await this.props.checkTokenIsValid(localStorageToken);
    if (!responseToken.IsSuccess) return;

    const getMemberInfoRes = await this.props.getAccountProfile(true);
    let bankInfoAuthentication = getMemberInfoRes.data.bankinfoauthentication;
    let isPhoneNull = !getMemberInfoRes.data.phone;
    let isEmailNull = !getMemberInfoRes.data.email;
    let isRegisterCompleted = getMemberInfoRes.data.registercompleted;

    if (config.features.ForceRedirectAddCard && !bankInfoAuthentication) {
      this.setState({ ...this.state, loading: false });
      if (isPhoneNull) {
        this.props.history.push({
          pathname: "/profile/phone",
          state: { forced: true },
        });
      }

      if (isEmailNull) {
        this.props.history.push({
          pathname: "/profile/email",
          state: { forced: true },
        });
      }

      if (!isRegisterCompleted) {
        this.props.history.push("/card/add");
      }

      return;
    }

    this.props.getBalanceList();
    this.handleUpdateProviderBalance();
    this.props.getMessageList(i18n.language, 1, 99);
    this.props.getBankCardList();
    this.props.getAutoTransferStatus();
    this.props.getDepositMethod();
    this.props.getWithdrawalChannel();
    this.props.getPromotionRouletteCount();
  }

  onFocus() {
    if (!this.props.account.token) return;

    this.props.getBalanceList();
  }

  handleLoginTokenChanged() {
    // if token became empty
    if (!this.props.general.token) {
      this.props.getSiteToken();
      this.props.getPromotion();
      return;
    }

    localStorage.setItem("client-token", this.props.general.token);
    //this.props.getMarquee(i18n.language);

    GeneralService.GetLocalization().then((response) => {
      if (response.IsSuccess) {
        ErrorSwitcher.setTranslation(response.data);
      }
    });

    this.props.getHomePageGameList();
    this.props.getBrandLanguage();
    this.props.getMarquee(i18n.language);
    this.props.getAnnouncement(i18n.language);
    this.props.getBanner();
    this.props.getBrand();
    this.props.getBrandCommunicationList();
    this.props.getLiveChatURL();
    this.props.getPromotion();
    this.props.getAffiliateStatus();
  }

  handleUpdateProviderBalance() {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    )
      return;

    // update provider's game balance
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter(
        (item) => item.abbreviation !== "NTTF" && item.abbreviation !== "RTTF"
      )
      .map((a) => {
        this.props.getGameBalance(a.abbreviation);
      });
  }

  handleUm() {
    if (this.props.general.isMaintenance === true) {
      this.props.history.push("/maintenance");
    }
  }

  handleLanguageChanged() {
    const { brandLanguage } = this.props.general;
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
  }

  handleRegister() {
    if (
      this.props.account.registercompleted === false &&
      config.features.Register_ShowPhone &&
      config.features.ForcedVerification
    ) {
      this.props.history.push({
        pathname: "/profile/phone",
        state: { forced: true },
      });
    }
  }

  handleNavigate(page) {
    const isAccessiblePage =
      page.indexOf("/promotion") > -1 ||
      page.indexOf("/customer-service") > -1 ||
      page.indexOf("/main/home") > -1 ||
      page.indexOf("/slot") > -1;

    const isTokenAvailable = this.props.account.token != null;

    if (!isAccessiblePage && !isTokenAvailable) {
      page = "/";
    }

    AppHistory.push(page);
  }

  // PopupAlert
  handleOpenPopupAlert(title, message, action) {
    this.setState((prevState) => {
      return {
        ...prevState,
        title: title,
        message: message,
        open: true,
        action: action,
      };
    });
  }

  handleCloseAudio() {
    if (document.getElementById("audio") != null)
      document.getElementById("audio").play();
  }

  handleCloseAnnouncement() {
    this.setState({
      ...this.state,
      openAnnouncement: false,
      showPromotion: true,
    });
    this.handleCloseAudio();
  }

  handleClosePromotion() {
    this.setState({ ...this.state, showPromotion: false });
    this.handleCloseAudio();
  }

  async componentDidMount() {
    Common.loadScript("/js/config.js", () => {
      Common.loadScript("/js/iovation.js", () => {});
    });
    this.saveUrlInfoToLocalStorage();
    await this.handleSiteDataFetching();
    this.handleGoto();
    this.handleTo();
    await this.handleAccountDataFetching();
    this.setState({ ...this.state, loading: false });

    window.addEventListener("focus", () => this.onFocus());
  }

  componentWillUnmount() {
    window.removeEventListener("focus", () => this.onFocus());
  }

  componentDidUpdate(preProps) {
    // popup announcement logic
    const isInHomePage =
      this.props.ui.mains &&
      this.props.ui.mains !== preProps.ui.mains &&
      this.props.ui.mains.length > 0;

    if (config.features.PopupAnnouncement) {
      if (isInHomePage) {
        this.setState({
          openAnnouncement: true,
          showPromotion: false,
        });
      }
    }

    // popup promotion logic
    if (config.features.PopupPromotion) {
      if (
        isInHomePage &&
        this.props.general.promotionList.items !==
          preProps.general.promotionList.items &&
        this.props.general.promotionList.items.length > 0
      ) {
        if (!this.state.openAnnouncement) {
          this.setState({
            showPromotion: true,
          });
        }
      }
    }

    // verify if token changed
    if (preProps.general.token !== this.props.general.token) {
      this.handleLoginTokenChanged();
    }

    // handle provider changed
    if (
      preProps.game.providerList.length !==
        this.props.game.providerList.length &&
      this.props.account.token !== null
    ) {
      this.handleUpdateProviderBalance();
    }

    // UM
    if (preProps.general.isMaintenance !== this.props.general.isMaintenance) {
      this.handleUm();
    }

    // language changed
    if (preProps.general.brandLanguage !== this.props.general.brandLanguage) {
      this.handleLanguageChanged();
    }

    // register is not completed
    if (
      preProps.account.registercompleted !==
      this.props.account.registercompleted
    ) {
      this.handleRegister();
    }
  }

  render() {
    const matchingPath =
      window.location.pathname === "/" ||
      window.location.pathname === "/main/home";

    const showPopupAnnouncement =
      config.features.PopupAnnouncement &&
      this.props.ui.mains &&
      this.props.ui.mains.length > 0 &&
      matchingPath;

    const showPopupPromotion =
      config.features.PopupPromotion &&
      this.props.general.promotionList.items.length > 0;

    if (
      (this.state.loading === true ||
        this.props.general.token === "" ||
        this.props.general.token === null) &&
      this.props.general.isMaintenance === false
    ) {
      return <Loading show={this.state.loading} opacity={1} />;
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
                      this.props.account.registercompleted === false &&
                      config.features.ForcedVerification && (
                        <>
                          <ForcedVerification
                            forcedverify={true}
                            alert={() => this.handleOpenPopupAlert()}
                          />
                        </>
                      )}

                    {showPopupAnnouncement && (
                      <PopupAnnouncement
                        open={this.state.openAnnouncement}
                        onClose={() => this.handleCloseAnnouncement()}
                      />
                    )}
                    {showPopupPromotion && (
                      <PopupPromotion
                        open={this.state.showPromotion}
                        onClose={() => this.handleClosePromotion()}
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
  }
}

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
