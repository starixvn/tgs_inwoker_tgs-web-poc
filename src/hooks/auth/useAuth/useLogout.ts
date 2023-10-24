import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";

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
  const { account, accountLogout } = useAccountStore();

  const handleLogout = useCallback(async () => {
    try {
      setLogoutState((prevState) => ({ ...prevState, isLoading: true }));

      const token = account.token || "";
      if (!token) {
        console.error("No token found");
        console.error(account);
      }

      const result = await accountLogout(token);
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
  }, [account.token, accountLogout]);

  return {
    logoutState,
    handleLogout,
  };
}
