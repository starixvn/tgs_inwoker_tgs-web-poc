import React, { useEffect } from "react";
import i18n from "@/utils/i18n";
import Affiliate from "@/components/_Share_Domain/Account/Affiliate";
import { usePageName } from "@/hooks/usePageName";

type Props = {};
const AffiliatePage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("affiliate.title"));
  }, []);

  return <Affiliate />;
};

export default AffiliatePage;
