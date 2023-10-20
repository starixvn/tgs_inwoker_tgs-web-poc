import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Line from "@/domain/Account/Profile/Line";

type Props = {};
const ProfileLinePage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.line"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <Line alert={alert} appHistory={history} />;
};

export default ProfileLinePage;
