import React, { useEffect } from "react";
import DownloadApp from "@/components/_Share_Domain/Account/DownloadApp";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const AppDownloadPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("main.account.appDownload"));
  }, []);

  return <DownloadApp />;
};

export default AppDownloadPage;
