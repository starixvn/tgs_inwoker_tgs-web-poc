import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Telegram from "@/components/_Share_Domain/Account/Profile/Telegram";
import { useNotifications } from "@/hooks/pageProps/useNotifications";

type Props = {};
const ProfileTelegramPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.telegram"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <Telegram alert={alert} appHistory={history} />;
};

export default ProfileTelegramPage;
