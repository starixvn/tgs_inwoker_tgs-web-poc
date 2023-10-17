import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import NameVerify from "@/domain/Account/Profile/NameVerify";
import { useNotifications } from "@/hooks/pageProps/useNotifications";

type Props = {};
const ProfileNamePage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("profile.nameVerify.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <NameVerify alert={alert} appHistory={history} />;
};

export default ProfileNamePage;
