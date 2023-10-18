import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import Details from "@/domain/Account/WithdrawalPrev/Details";
import { useLocation } from "react-router";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import TransferTabs from "@/domain/Account/DepositPrev/components/TransferTabs";
import i18n from "@/utils/i18n";
import iconWithdrawal from "@/assets/images/account/badge/icon-withdrawal.svg";
import { useRwd } from "@/hooks/useRwd";
import AccountPaper from "@/components/AccountPaper";

const WithdrawalDetailContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const WithdrawalDetails = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const location = useLocation();
  const order = location.state?.order || null;
  const { isDesktopSize } = useRwd();

  return (
    <WithdrawalDetailContainer>
      {isDesktopSize && <UserWalletInfo />}

      {!isDesktopSize && <TransferTabs />}
      <AccountPaper
        pageName={i18n.t("common.withdrawal")}
        iconUrl={iconWithdrawal}
      >
        <Details appHistory={history} alert={alert} order={order} />;
      </AccountPaper>
    </WithdrawalDetailContainer>
  );
};

export default WithdrawalDetails;
