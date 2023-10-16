import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Viber from "@/components/_Share_Domain/Account/Profile/Viber";

type Props = {};
const ProfileViberPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.viber"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <Viber alert={alert} appHistory={history} />;
};

export default ProfileViberPage;
