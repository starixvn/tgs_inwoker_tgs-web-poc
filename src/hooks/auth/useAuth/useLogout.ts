import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import { useInboxStore } from "@/hooks/stores/useInboxStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import i18n from "@/utils/i18n";

export type LogoutState = {
  data: any | null;
  isLoading: boolean;
  error: Error | null;
};

export function useLogout() {
  const [logoutState, setLogoutState] = useState<LogoutState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const history = useHistory();
  const accountStore = useAccountStore();

  const handleClickLogout = useCallback(async () => {
    try {
      setLogoutState((prevState) => ({ ...prevState, isLoading: true }));

      const token = accountStore.account.token;
      if (!token) return;

      const result = await accountStore.accountLogout(token);
      setLogoutState({ isLoading: false, data: result.data, error: null });
      history.push("/");
    } catch (error: any) {
      console.log(error);

      setLogoutState({
        isLoading: false,
        data: null,
        error: error,
      });
    }
  }, []);

  return {
    logoutState,
    handleClickLogout,
  };
}
