import { useCallback, useEffect, useState } from "react";
import { FormikValues, useFormik } from "formik";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGenerateLoginFormik } from "@/hooks/auth/useAuthForm/hooks/useGenerateLoginFormik";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";
import { useRwd } from "@/hooks/useRwd";

export function useLoginForm() {
  const { loginState, handleLogin } = useAuth();
  const [needToRemember, setNeedToRemember] = useState(false);
  const { handleToggleLoginDialog } = useAuthDialog();
  const { isDesktopSize } = useRwd();

  const handleClickNeedToRemember = () => {
    setNeedToRemember((prevState) => !prevState);
  };

  // ===== handle click login =====
  const handleClickLogin = useCallback(
    async (values: FormikValues) => {
      try {
        const { username, password } = values;
        await handleLogin(username, password, needToRemember);

        if (isDesktopSize) {
          handleToggleLoginDialog(false);
        }
      } catch (error: any) {
        console.error(error);
      }
    },
    [needToRemember]
  );

  const { formInputConfigList, formik } = useGenerateLoginFormik({
    handleClickSubmit: handleClickLogin,
  });

  return {
    formInputConfigList,
    formik,
    isLoading: loginState.isLoading,
    loginError: loginState.error,
    needToRemember,
    handleClickNeedToRemember,
  };
}
