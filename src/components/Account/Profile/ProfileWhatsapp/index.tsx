import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Whatsapp from "@/domain/Account/Profile/Whatsapp";

type Props = {};
const ProfileWhatsappPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.whatsapp"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <Whatsapp alert={alert} appHistory={history} />;
};

export default ProfileWhatsappPage;
