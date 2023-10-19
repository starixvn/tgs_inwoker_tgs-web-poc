import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import Details from "@/domain/Account/DepositPrev/Details";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import TransferTabs from "@/domain/Account/DepositPrev/components/TransferTabs";
import { useRwd } from "@/hooks/useRwd";
import i18n from "@/utils/i18n";
import iconDeposit from "@/assets/images/account/badge/icon-deposit.svg";
import AccountPaper from "@/components/AccountPaper";

const DepositContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const DepositDetails = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <DepositContainer>
      {isDesktopSize && <UserWalletInfo />}

      {!isDesktopSize && <TransferTabs />}
      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <Details appHistory={history} alert={alert} />;
      </AccountPaper>
    </DepositContainer>
  );
};

export default DepositDetails;
