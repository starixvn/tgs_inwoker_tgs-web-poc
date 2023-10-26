import React, { useEffect } from "react";
import { usePageName } from "@/hooks/usePageName/usePageName";
import i18n from "@/utils/i18n";
import Support from "@/domain/Account/Support";
import styled from "styled-components";

const ContactUsContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const ContactUsPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("support.contact"));
  }, []);

  return (
    <ContactUsContainer>
      <Support />
    </ContactUsContainer>
  );
};

export default ContactUsPage;
