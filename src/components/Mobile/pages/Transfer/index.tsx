import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TransferPrev from "@/components/_Share_Domain/Account/TransferPrev";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const Transfer = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("report.title"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <TransferPrev alert={alert} history={history} />;
};

export default Transfer;
