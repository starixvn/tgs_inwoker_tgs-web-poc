import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InboxDialog from "@/components/Mobile/pages/Inbox/InboxDialog";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const Inbox = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("affiliate.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <InboxDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default Inbox;
