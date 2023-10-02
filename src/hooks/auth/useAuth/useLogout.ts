import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

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

  const handleLogout = useCallback(async () => {
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
    handleLogout,
  };
}
