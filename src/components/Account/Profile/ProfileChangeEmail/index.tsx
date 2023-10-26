import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ChangeEmail from "@/domain/Account/Profile/ChangeEmail";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const ProfileChangeEmail = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("profile.email.editEmail"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangeEmail alert={alert} appHistory={history} />;
};

export default ProfileChangeEmail;
