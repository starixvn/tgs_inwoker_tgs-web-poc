import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import { useInboxStore } from "@/hooks/stores/useInboxStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import i18n from "@/utils/i18n";

export type RegisterState = {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
};

export function useRegister() {
  const [registerState, setRegisterState] = useState<RegisterState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const history = useHistory();
  const { toggleLoginDialog } = useAuthDialog();
  const accountStore = useAccountStore();
  const walletStore = useWalletStore();
  const inboxStore = useInboxStore();
  const generalStore = useGeneralStore();

  const handleClickRegister = useCallback(async () => {
    try {
      setRegisterState((prevState) => ({ ...prevState, isLoading: true }));

      const token = accountStore.account.token;
      if (!token) return;

      const result = await accountStore.accountLogout(token);
      // await handleLoginSuccess(username, needToRemember);
      setRegisterState({ isLoading: false, data: result.data, error: null });
      toggleLoginDialog();
    } catch (error: any) {
      console.log(error);

      setRegisterState({
        isLoading: false,
        data: null,
        error: error,
      });

      if (error.message === "banned") {
        toggleLoginDialog();
        history.push("/banned");
      }
    }
  }, []);

  return {
    registerState,
    handleClickRegister,
  };
}
