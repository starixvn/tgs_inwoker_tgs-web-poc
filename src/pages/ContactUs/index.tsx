import React, { useEffect } from "react";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";
import Support from "@/domain/Account/Support";

type Props = {};
const ContactUsPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("support.contact"));
  }, []);

  return <Support />;
};

export default ContactUsPage;
