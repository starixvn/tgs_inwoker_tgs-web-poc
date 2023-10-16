import { useState } from "react";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router";
import config from "@/config/config";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import { useInboxStore } from "@/hooks/stores/useInboxStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useLocation } from "react-router-dom";

export type LoginState = {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
};

export function useLogin() {
  const [loginState, setLoginState] = useState<LoginState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const history = useHistory();
  const location = useLocation();
  const { accountLogin, getAccountInfo } = useAccountStore();
  const walletStore = useWalletStore();
  const inboxStore = useInboxStore();
  const generalStore = useGeneralStore();

  const handleLogin = async (
    username: string,
    password: string,
    needToRemember?: boolean
  ) => {
    try {
      setLoginState({ isLoading: true, data: null, error: null });

      const result = await accountLogin(username, password);

      if (!result?.IsSuccess) {
        handleLoginFailure(result?.code);
      } else {
        setLoginState({
          isLoading: false,
          data: result,
          error: null,
        });
        await handleLoginSuccess(username, needToRemember);
      }
    } catch (error) {
      handleLoginError(error);
    }
  };

  const handleLoginFailure = (code: number | undefined) => {
    if (code === 210) {
      handleLoginError(new Error("banned"));
    } else {
      handleLoginError(new Error(i18n.t("common.msgInvalidUsername")));
    }
  };

  const handleLoginSuccess = async (
    username: string,
    needToRemember?: boolean
  ) => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has("return_url")) {
      // const returnValue = urlParams.get('return_url')
      // if (returnValue) {
      //   window.location.href =
      //     returnValue + '?token=' + BlowFishEncryption.Encrypt(token)
      // }
    }

    if (await shouldRedirectToProfile(username)) {
      redirectToProfile();
    } else {
      await fetchData();
      handleLocalStorage(needToRemember || false, username);
      redirectToHome();
    }
  };

  const shouldRedirectToProfile = async (username: string) => {
    const response = await getAccountInfo();
    return (
      config.features.Register_ShowPhone &&
      config.features.ForcedVerification &&
      !response.data.registercompleted
    );
  };

  const redirectToProfile = () => {
    history.push("/profile/phone", { forced: true });
  };

  const fetchData = async () => {
    const promiseList = [
      walletStore.getBalanceList(),
      inboxStore.getMessages(i18n.language, 1, 99),
      walletStore.getBankCardList(),
      generalStore.getPromotion(),
      generalStore.getPromotionRouletteCount(),
      walletStore.getWithdrawalChannel(),
    ];
    await Promise.all(promiseList);
  };

  const handleLocalStorage = (needToRemember: boolean, username: string) => {
    if (needToRemember) {
      localStorage.setItem("remember", "true");
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("remember");
      localStorage.removeItem("username");
    }
  };

  const redirectToHome = () => {
    history.push("/");
  };

  const handleLoginError = (error: Error) => {
    setLoginState({
      isLoading: false,
      data: null,
      error: error,
    });

    if (error.message === "banned") {
      history.push("/banned");
    }
  };

  return {
    loginState,
    handleLogin,
  };
}
