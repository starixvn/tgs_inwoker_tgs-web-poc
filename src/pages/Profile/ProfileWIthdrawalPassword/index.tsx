import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import WithdrawalPassword from "@/domain/Account/Profile/WithdrawalPassword";

type Props = {};
const ProfileWithdrawalPasswordPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("profile.withdrawalPassword.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <WithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileWithdrawalPasswordPage;
