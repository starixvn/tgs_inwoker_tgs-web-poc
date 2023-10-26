import React from "react";
import DepositPrev from "@/domain/Account/DepositPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import { useLocation } from "react-router";
import TransferTabs from "@/domain/Account/DepositPrev/components/TransferTabs";
import { useRwd } from "@/hooks/useRwd";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import iconDeposit from "@/assets/t18/images/account/badge/icon-deposit.svg";
import i18n from "@/utils/i18n";
import AccountPaper from "@/components/AccountPaper";

const DepositContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const DepositPage = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const location = useLocation();
  const { isDesktopSize } = useRwd();
  const order = location.state?.order || null;

  return (
    <DepositContainer>
      {isDesktopSize && <UserWalletInfo />}

      {!isDesktopSize && <TransferTabs />}
      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <DepositPrev appHistory={history} alert={alert} order={order} />
      </AccountPaper>
    </DepositContainer>
  );
};

export default DepositPage;
