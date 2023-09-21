import { useCallback, useState } from "react";
import { accountAction } from "@/api-services/actions/accountAction";
import i18n from "@/utils/i18n";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import config from "@/config/config";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

type LoginState = {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
};
export function useLogin() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { toggleLoginDialog } = useAuthDialog();
  const accountStore = useAccountStore();
  const [loginState, setLoginState] = useState<LoginState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const handleClickLogin = useCallback(
    async (username: string, password: string, needToRemember?: boolean) => {
      try {
        setLoginState((prevState) => ({ ...prevState, isLoading: true }));

        const result = await accountStore.accountLogin(username, password);
        console.log(result);

        if (!result?.IsSuccess) {
          if (result?.code === 210) throw new Error("banned");

          throw new Error(i18n.t("common.msgInvalidUsername"));
        }

        await handleLoginSuccess(username, needToRemember);
        setLoginState({ isLoading: false, data: result.data, error: null });
        toggleLoginDialog();
      } catch (error: any) {
        console.log(error);

        setLoginState({
          isLoading: false,
          data: null,
          error: error,
        });

        if (error.message === "banned") {
          toggleLoginDialog();
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
    const response: any = await dispatch(accountAction.getAccountInfo());

    if (!response.IsSuccess) throw new Error("Fetching account info fail");

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
        // this.props.getBalanceList();
        // this.props.getMessageList(i18n.language, 1, 99);
        // this.props.getBankCardList();
        // this.props.getPromotion();
        // this.props.getPromotionRouletteCount();
        // this.props.getWithdrawalChannel();
      }

      if (needToRemember) {
        localStorage.setItem("remember", "true");
        localStorage.setItem("username", `${username}`);
      } else {
        localStorage.removeItem("remember");
        localStorage.removeItem("username");
      }
    }
  };

  return {
    loginState,
    handleClickLogin,
  };
}
