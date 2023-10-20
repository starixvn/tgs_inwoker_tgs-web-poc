import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import QQ from "@/domain/Account/Profile/QQ";

type Props = {};
const ProfileQQPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.qqNumber"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <QQ alert={alert} appHistory={history} />;
};

export default ProfileQQPage;
