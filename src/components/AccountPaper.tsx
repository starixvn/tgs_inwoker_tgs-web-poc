import React from "react";
import styled from "styled-components";
import PageBadge from "@/components/PageBadge";
import iconDeposit from "@/assets/t18/images/account/badge/icon-deposit.svg";
import i18n from "@/utils/i18n";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@/hooks/useRwd";

const AccountPaperContainer = styled.div`
  padding: 20px 0;
  border-radius: 20px;

  ${media.sm} {
    background: ${({ theme }) => theme.primaryLight};
    padding: 20px 24px;
  }
`;

type Props = {
  pageName: string;
  iconUrl: string;
  children: React.ReactElement | React.ReactElement[];
};
const AccountPaper = ({ pageName, iconUrl, children }: Props) => {
  const { isDesktopSize } = useRwd();

  return (
    <AccountPaperContainer>
      {isDesktopSize && (
        <PageBadge
          iconUrl={iconUrl}
          text={pageName}
          style={{
            marginBottom: "31px",
          }}
        />
      )}
      {children}
    </AccountPaperContainer>
  );
};

export default AccountPaper;
