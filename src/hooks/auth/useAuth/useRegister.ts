import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { RegisterResDto } from "@/models/dto/player/RegisterReqDto";
import { useSnackbar } from "notistack";

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
  const { enqueueSnackbar } = useSnackbar();

  const handleRegister = useCallback(async (registerReqDto: RegisterResDto) => {
    try {
      setRegisterState((prevState) => ({ ...prevState, isLoading: true }));

      const result = await accountStore.registerAccount(registerReqDto);
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
