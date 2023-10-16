import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import WeChat from "@/components/_Share_Domain/Account/Profile/WeChat";

type Props = {};
const ProfileWeChatPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.wechatNumber"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <WeChat alert={alert} appHistory={history} />;
};

export default ProfileWeChatPage;
