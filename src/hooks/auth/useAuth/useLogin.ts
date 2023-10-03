import { useCallback, useState } from "react";
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
  const accountStore = useAccountStore();
  const walletStore = useWalletStore();
  const inboxStore = useInboxStore();
  const generalStore = useGeneralStore();

  const handleLogin = useCallback(
    async (username: string, password: string, needToRemember?: boolean) => {
      try {
        setLoginState((prevState) => ({ ...prevState, isLoading: true }));

        const result = await accountStore.accountLogin(username, password);

        if (!result?.IsSuccess) {
          if (result?.code === 210) throw new Error("banned");

          throw new Error(i18n.t("common.msgInvalidUsername"));
        }

        await handleLoginSuccess(username, needToRemember);
        setLoginState({ isLoading: false, data: result.data, error: null });
        history.push("/");
      } catch (error: any) {
        console.log(error);

        setLoginState({
          isLoading: false,
          data: null,
          error: error,
        });

        if (error.message === "banned") {
          history.push("/banned");
        }
      }
    },
    []
  );

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

    const response = await accountStore.getAccountInfo();
    if (!response?.IsSuccess) throw new Error("Fetching account info fail");

    const bankInfoAuthentication = response.data.bankinfoauthentication;
    if (
      !response.data.registercompleted &&
      config.features.Register_ShowPhone &&
      config.features.ForcedVerification
    ) {
      if (
        config.features.Register_CustomFlow_IDR &&
        config.features.NavigateToAddCard
      ) {
        if (!response.data.phone) {
          history.push({
            pathname: "/profile/phone",
            state: { forced: true },
          });
        }

        if (response.data.email === null) {
          history.push({
            pathname: "/profile/email",
            state: { forced: true },
          });
        }

        if (!response.data.registercompleted) {
          history.replace("/card/add");
        }

        history.push({
          pathname: "/profile/phone",
          state: { forced: true },
        });
      }
    } else {
      if (
        !config.features.Register_CustomFlow_IDR ||
        (config.features.Register_CustomFlow_IDR && bankInfoAuthentication)
      ) {
        // TODO:fetch data

        const promiseList = [
          walletStore.getBalanceList,
          () => inboxStore.getMessages(i18n.language, 1, 99),
          walletStore.getBankCardList,
          generalStore.getPromotion,
          generalStore.getPromotionRouletteCount,
          walletStore.getWithdrawalChannel,
        ];

        await Promise.all(promiseList);
      }

      if (needToRemember) {
        localStorage.setItem("remember", "true");
        localStorage.setItem("username", `${username}`);
      } else {
        localStorage.removeItem("remember");
        localStorage.removeItem("username");
      }

      history.push("/");
    }
  };

  return {
    loginState,
    handleLogin,
  };
}
