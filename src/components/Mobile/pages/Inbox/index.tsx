import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Inbox from "@/components/_Share_Domain/Account/Inbox";

type Props = {};
const InboxPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("inbox.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <Inbox alert={alert} history={history} />;
};

export default InboxPage;
