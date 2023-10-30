import React from "react";
import WithdrawalPrev from "@/domain/Account/WithdrawalPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import TransferTabs from "@/domain/Account/DepositPrev/components/TransferTabs";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import { useRwd } from "@/hooks/useRwd";
import i18n from "@/utils/i18n";
import iconWithdrawal from "@/assets/t18/images/account/badge/icon-withdrawal.svg";
import AccountPaper from "@/components/AccountPaper";

const WithdrawalContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const Withdrawal = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const { isDesktopSize } = useRwd();

  return (
    <WithdrawalContainer>
      {isDesktopSize && <UserWalletInfo />}

      {!isDesktopSize && <TransferTabs />}
      <AccountPaper
        pageName={i18n.t("common.withdrawal")}
        iconUrl={iconWithdrawal}
      >
        <WithdrawalPrev appHistory={history} alert={alert} />
      </AccountPaper>
    </WithdrawalContainer>
  );
};

export default Withdrawal;
