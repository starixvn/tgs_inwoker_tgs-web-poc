import { useCallback, useEffect, useState } from "react";
import { FormikValues, useFormik } from "formik";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGenerateLoginFormik } from "@/hooks/auth/useAuthForm/hooks/useGenerateLoginFormik";

export function useLoginForm() {
  const { handleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [needToRemember, setNeedToRemember] = useState(false);

  const handleClickNeedToRemember = () => {
    setNeedToRemember((prevState) => !prevState);
  };

  // ===== handle click login =====
  const handleClickLogin = useCallback(
    async (values: FormikValues) => {
      try {
        const { username, password } = values;
        setIsLoading(true);
        await handleLogin(username, password, needToRemember);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
    isLoading,
    needToRemember,
    handleClickNeedToRemember,
  };
}
