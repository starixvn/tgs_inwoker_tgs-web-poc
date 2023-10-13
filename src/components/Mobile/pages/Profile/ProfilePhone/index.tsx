import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Phone from "@/components/_Share_Domain/Account/Profile/Phone";

type Props = {};
const ProfilePhonePage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.phoneNumber"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <Phone alert={alert} appHistory={history} />;
};

export default ProfilePhonePage;
