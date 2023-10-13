import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReportPrev from "@/components/_Share_Domain/Account/ReportPrev";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const Report = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("affiliate.report"));
  }, []);

  const { alert } = useNotifications();
  const history = useHistory();

  return <ReportPrev alert={alert} history={history} />;
};

export default Report;
