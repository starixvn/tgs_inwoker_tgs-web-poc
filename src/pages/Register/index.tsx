import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "@/domain/authentication/RegisterForm";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRwd } from "@/hooks/useRwd";

type Props = {};
const RegisterPage = (props: Props) => {
  const { updatePageName } = usePageName();
  const history = useHistory();
  const { isLogin } = useAuth();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }

    updatePageName(i18n.t("common.register"));
  }, []);

  if (isDesktopSize) {
    return null;
  }

  return <RegisterForm />;
};

export default RegisterPage;
