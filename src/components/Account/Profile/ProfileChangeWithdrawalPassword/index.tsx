import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import ChangeWithdrawalPassword from "@/domain/Account/Profile/ChangeWithdrawalPassword";

type Props = {};
const ProfileChangeWithdrawalPasswordPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("profile.changeWithdrawalPassword.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangeWithdrawalPassword alert={alert} appHistory={history} />;
};

export default ProfileChangeWithdrawalPasswordPage;
