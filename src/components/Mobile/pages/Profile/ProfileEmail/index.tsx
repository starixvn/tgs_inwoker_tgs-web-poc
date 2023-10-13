import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Email from "@/components/_Share_Domain/Account/Profile/Email";

type Props = {};
const ProfileEmailPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.emailAddress"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <Email alert={alert} appHistory={history} />;
};

export default ProfileEmailPage;
