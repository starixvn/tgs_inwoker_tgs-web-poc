import React, { useEffect } from "react";
import i18n from "@/utils/i18n";
import Affiliate from "@/domain/Account/Affiliate";
import { usePageName } from "@/hooks/usePageName/usePageName";
import styled from "styled-components";
import { useRwd } from "@/hooks/useRwd";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import iconAffiliate from "@/assets/t18/images/account/badge/icon-affiliate.svg";
import AccountPaper from "@/components/AccountPaper";

const AffiliateContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const AffiliatePage = (props: Props) => {
  const { updatePageName } = usePageName();
  const { isDesktopSize } = useRwd();

  useEffect(() => {
    updatePageName(i18n.t("affiliate.title"));
  }, []);

  return (
    <AffiliateContainer>
      {isDesktopSize && <UserWalletInfo />}

      <AccountPaper
        pageName={i18n.t("affiliate.title")}
        iconUrl={iconAffiliate}
      >
        <Affiliate />
      </AccountPaper>
    </AffiliateContainer>
  );
};

export default AffiliatePage;
