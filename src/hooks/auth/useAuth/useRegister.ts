import { useCallback, useState } from "react";
import { useHistory } from "react-router";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { RegisterReqDto } from "@/models/dto/player/RegisterReqDto";
import { useSnackbar } from "notistack";
import ErrorSwitcher from "@/utils/ErrorSwitcher";
import i18n from "@/utils/i18n";
import config from "@/config/config";

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

  const handleRegister = useCallback(async (registerReqDto: RegisterReqDto) => {
    try {
      setRegisterState((prevState) => ({ ...prevState, isLoading: true }));

      const registerResDto = await accountStore.registerAccount(registerReqDto);

      if (!registerResDto.IsSuccess) {
        enqueueSnackbar(ErrorSwitcher.getTranslation(registerResDto.info), {
          variant: "warning",
        });
      }

      if (!registerResDto.data.isnew) {
        enqueueSnackbar(i18n.t("common.msgAlreadyExist"), {
          variant: "warning",
        });
      }

      //TODO: register workflow
      // const {username,pwd} = registerReqDto
      // if (config.features.SMSVerification) {
      //
      //   props.onRegisterSuccess(username, password);
      // } else if (
      //   config.features.Register_ShowEmail &&
      //   config.features.Register_ShowPhone
      // ) {
      //   props.doLoginWithHpEmail(username, password, phone, email);
      // } else if (config.features.Register_ShowPhone) {
      //   props.doLoginWithHp(username, password, phone);
      // } else {
      //   props.doLogin(username, password);
      // }

      setRegisterState({
        isLoading: false,
        data: registerResDto.data,
        error: null,
      });
      history.push("/");
    } catch (error: any) {
      setRegisterState({
        isLoading: false,
        data: null,
        error: error,
      });

      if (error.message === "banned") {
        history.push("/banned");
      }

      throw error;
    }
  }, []);

  return {
    registerState,
    handleRegister,
  };
}
