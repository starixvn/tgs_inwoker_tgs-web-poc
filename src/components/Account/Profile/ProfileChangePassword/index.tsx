import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ChangePassword from "@/domain/Account/Profile/ChangePassword";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const ProfileChangePasswordPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("profile.changePassword.editPassword"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangePassword alert={alert} appHistory={history} />;
};

export default ProfileChangePasswordPage;
