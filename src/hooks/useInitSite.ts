import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import { useUiStore } from "@/hooks/stores/useUiStore";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { useInboxStore } from "@/hooks/stores/useInboxStore";
import { useDispatch } from "react-redux";
import i18n from "@/utils/i18n";
import BlowFishEncryption from "@/utils/BlowFishEncryption";
import { AppHistory } from "@/history/History";
import config from "@/config/config";

export function useInitSite() {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const accountStore = useAccountStore();
  const generalStore = useGeneralStore();
  const walletStore = useWalletStore();
  const uiStore = useUiStore();
  const gameStore = useGameStore();
  const inboxStore = useInboxStore();

  const dispatch = useDispatch();

  const updateScreenSize = () => {
    const w = window.screen.width;
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );

    const scale = w / 750;

    uiStore.updateScreenSize(w, h);
  };

  const onFocus = async () => {
    if (accountStore.account.token !== null) {
      await walletStore.getBalanceList();
    }
  };

  const validateTokenState = async () => {
    const urlpath = location.pathname.split("/");
    if (urlpath.length === 3) {
      if (urlpath[1] === "a") {
        localStorage.setItem("promotionId", urlpath[2] || "");
        localStorage.setItem("upper", ""); //reset
        localStorage.setItem("invitationtype", "a");
      }
      if (urlpath[1] === "p") {
        localStorage.setItem("upper", urlpath[2] || "");
        localStorage.setItem("promotionId", ""); //reset
        localStorage.setItem("invitationtype", "p");
      }
    } else {
      localStorage.setItem("invitationtype", "");
      localStorage.setItem("upper", ""); //reset
      localStorage.setItem("promotionId", ""); //reset
    }
    // =============================================
    window.addEventListener("resize", updateScreenSize);

    if (generalStore.general.token === "") {
      await generalStore.getSiteToken();
    } else {
      const promiseList = [
        generalStore.getBrandLanguage,
        () => uiStore.getMarquee(i18n.language),
        () => uiStore.getAnnouncement(i18n.language),
        generalStore.getBanner,
        generalStore.getBrand,
        generalStore.getBrandCommunication,
        generalStore.getLiveChatURL,
        generalStore.getPromotion,
        walletStore.getDepositMethod,
        walletStore.getWithdrawalChannel,
        generalStore.getAffiliateStatus,
      ];

      await Promise.all(promiseList);
    }

    // =============================================
    let urlParams = new URLSearchParams(location.search);
    if (urlParams.has("goto")) {
      const gotoValue = urlParams.get("goto");
      if (gotoValue) {
        window.location.href = gotoValue;
      }
    }
    // =============================================
    if (urlParams.has("do")) {
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

          localStorage.setItem("token1", `${decryptedToken}`);
          AppHistory.replace("/");
          break;
        default:
          return "";
      }
    }

    // =============================================

    const localStorageToken = localStorage.getItem("token1");

    const NEED_TO_REFRESH_TOKEN =
      localStorageToken != null &&
      accountStore.account.token == null &&
      accountStore.account.info.token === "";

    if (NEED_TO_REFRESH_TOKEN) {
      const responseToken = await accountStore.checkTokenIsValid();
      if (!responseToken.IsSuccess) return;

      const { data: memberInfo } = await accountStore.getAccountProfile(true);

      const bankInfoAuthentication = memberInfo?.bankinfoauthentication;
      const isPhoneNull = memberInfo.phone === null;
      const isEmailNull = memberInfo.email === null;
      const isRegisterCompleted = memberInfo.registercompleted;

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
    // =============================================
    gameStore.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter(
        (item) => item.abbreviation !== "NTTF" && item.abbreviation !== "RTTF"
      )
      .map((a) => {
        walletStore.getGameBalance(a.abbreviation);
      });

    const anotherPromiseList = [
      walletStore.getBalanceList,
      () => inboxStore.getMessages(i18n.language, 1, 99),
      walletStore.getBankCardList,
      walletStore.getAutoTransferStatus,
      walletStore.getDepositMethod,
      walletStore.getWithdrawalChannel,
      generalStore.getPromotionRouletteCount,
    ];

    await Promise.all(anotherPromiseList);
    setIsLoading(false);

    window.addEventListener("focus", onFocus);
  };

  useEffect(() => {
    validateTokenState().then();

    return () => {
      window.removeEventListener("resize", updateScreenSize);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return {
    isLoading,
  };
}
