import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import ResetWithdrawalPassword from "@/domain/Account/Profile/ResetWithdrawalPassword";

type Props = {};
const ProfileResetWithdrawalPasswordPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("profile.resetResetWithdrawalPassword.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <ResetWithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileResetWithdrawalPasswordPage;
