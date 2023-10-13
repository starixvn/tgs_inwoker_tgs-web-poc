import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import FacebookMessenger from "@/components/_Share_Domain/Account/Profile/FacebookMessenger";

type Props = {};
const ProfileFacebookMessengerPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.fb"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <FacebookMessenger alert={alert} appHistory={history} />;
};

export default ProfileFacebookMessengerPage;
