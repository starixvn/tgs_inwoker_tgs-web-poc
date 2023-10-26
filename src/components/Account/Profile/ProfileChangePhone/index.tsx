import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName/usePageName";
import i18n from "@/utils/i18n";
import ChangePhone from "@/domain/Account/Profile/ChangePhone";

type Props = {};
const ProfileChangePhonePage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("profile.changePhone.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <ChangePhone alert={alert} appHistory={history} />;
};

export default ProfileChangePhonePage;
