import Common from "@/utils/Common";
import { useEffect, useRef, useState } from "react";
import i18n from "@/utils/i18n";
import BlowFishEncryption from "@/utils/BlowFishEncryption";
import { AppHistory } from "@/history/History";
import config from "@/config/config";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useUiStore } from "@/hooks/stores/useUiStore";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import { useInboxStore } from "@/hooks/stores/useInboxStore";
import { GeneralService } from "@/api-services/services/GeneralService";
import ErrorSwitcher from "@/utils/ErrorSwitcher";
import { useGameStore } from "@/hooks/stores/useGameStore";

export function useInitSite() {
  const {
    general,
    getSiteToken,
    getBrandLanguage,
    getBanner,
    getBrand,
    getBrandCommunication,
    getLiveChatURL,
    getPromotion,
    getAffiliateStatus,
    getPromotionRouletteCount,
  } = useGeneralStore();
  const {
    getDepositMethod,
    getWithdrawalChannel,
    getBalanceList,
    getBankCardList,
    getAutoTransferStatus,
  } = useWalletStore();
  const { account, checkTokenIsValid, getAccountProfile } = useAccountStore();
  const { getMarquee, getAnnouncement } = useUiStore();
  const { getMessages } = useInboxStore();
  const { getHomePageGameList } = useGameStore();

  const [isInitSiteLoading, setIsInitSiteLoading] = useState(true);

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

  const handleSiteDataFetching = async () => {
    if (!general.token) {
      await getSiteToken();
      return;
    }

    getBrandLanguage();
    getMarquee(i18n.language);
    getAnnouncement(i18n.language);
    getBanner();
    getBrand();
    getBrandCommunication();
    getLiveChatURL();
    getPromotion();
    getDepositMethod();
    getWithdrawalChannel();
    getAffiliateStatus();
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
        localStorage.removeItem("token0");
        localStorage.removeItem("token1");
        break;

      case "login_token":
        const decryptedToken = BlowFishEncryption.Decrypt(
          urlParams.get("token")
        );

        localStorage.setItem("token0", decryptedToken);
        localStorage.setItem("token1", decryptedToken);
        AppHistory.replace("/");
        break;

      default:
        return "";
    }
  };

  const handleAccountInfoFetching = async () => {
    const localStorageToken =
      localStorage.getItem("token0") || localStorage.getItem("token1");

    const isNeedToRestoreAccountData =
      !!localStorageToken && !account.token && !account.info.token;
    if (!isNeedToRestoreAccountData) return;

    const responseToken = await checkTokenIsValid();
    if (!responseToken.IsSuccess) return;

    const getMemberInfoRes = await getAccountProfile(true);
    let bankInfoAuthentication = getMemberInfoRes.data.bankinfoauthentication;
    let isPhoneNull = !getMemberInfoRes.data.phone;
    let isEmailNull = !getMemberInfoRes.data.email;
    let isRegisterCompleted = getMemberInfoRes.data.registercompleted;

    if (config.features.ForceRedirectAddCard && !bankInfoAuthentication) {
      setIsInitSiteLoading(false);
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

    getBalanceList();
    // handleUpdateProviderBalance();
    getMessages(i18n.language, 1, 99);
    getBankCardList();
    getAutoTransferStatus();
    getDepositMethod();
    getWithdrawalChannel();
    getPromotionRouletteCount();
  };

  const onFocus = () => {
    if (!account.token) return;

    getBalanceList();
  };

  const init = async () => {
    Common.loadScript("/js/config.js", () => {
      Common.loadScript("/js/iovation.js", () => {});
    });
    saveUrlInfoToLocalStorage();
    await handleSiteDataFetching();
    handleGoto();
    handleTo();
    await handleAccountInfoFetching();
    setIsInitSiteLoading(false);
  };

  useEffect(() => {
    init();

    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const handleLoginTokenChanged = async () => {
    if (!general.token) {
      getSiteToken();
      getPromotion();
      return;
    }

    localStorage.setItem("client-token", general.token);

    GeneralService.GetLocalization().then((response: any) => {
      if (response.IsSuccess) {
        ErrorSwitcher.setTranslation(response.data);
      }
    });

    getHomePageGameList();
    getBrandLanguage();
    getMarquee(i18n.language);
    getAnnouncement(i18n.language);
    getBanner();
    getBrand();
    getBrandCommunication();
    getLiveChatURL();
    getPromotion();
    getAffiliateStatus();
  };

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      handleLoginTokenChanged();
    } else {
      isMounted.current = true;
    }
  }, [general.token]);

  return {
    isInitSiteLoading,
  };
}
