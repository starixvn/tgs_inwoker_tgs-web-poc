import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

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
  const accountStore = useAccountStore();

  const handleRegister = useCallback(async () => {
    try {
      setRegisterState((prevState) => ({ ...prevState, isLoading: true }));

      const token = accountStore.account.token;
      if (!token) return;

      const result = await accountStore.accountLogout(token);
      // await handleLoginSuccess(username, needToRemember);
      setRegisterState({ isLoading: false, data: result.data, error: null });
      history.push("/");
    } catch (error: any) {
      console.log(error);

      setRegisterState({
        isLoading: false,
        data: null,
        error: error,
      });

      if (error.message === "banned") {
        history.push("/banned");
      }
    }
  }, []);

  return {
    registerState,
    handleRegister,
  };
}
