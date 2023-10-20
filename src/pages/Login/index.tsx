import React, { useEffect } from "react";
import LoginForm from "@/domain/authentication/LoginForm";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import { useRwd } from "@/hooks/useRwd";
import { useHistory } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";

type Props = {};
const LoginPage = (props: Props) => {
  const { updatePageName } = usePageName();
  const { isLogin } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleToggleLoginDialog } = useAuthDialog();

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }

    if (isDesktopSize) {
      handleToggleLoginDialog();
    }

    updatePageName(i18n.t("common.login"));
  }, []);

  if (isDesktopSize) {
    return null;
  }

  return <LoginForm />;
};

export default LoginPage;
