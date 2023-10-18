import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import Manual from "@/domain/Account/DepositPrev/Manual";
import UserWalletInfo from "@/components/Account/UserWalletInfo";
import TransferTabs from "@/domain/Account/DepositPrev/components/TransferTabs";
import i18n from "@/utils/i18n";
import iconDeposit from "@/assets/images/account/badge/icon-deposit.svg";
import AccountPaper from "@/components/AccountPaper";
import { useRwd } from "@/hooks/useRwd";

const DepositContainer = styled.div`
  padding: 21px 22px;
  max-width: calc(848px + 22px * 2);
  margin: auto;
`;

type Props = {};
const DepositManual = (props: Props) => {
  const { isDesktopSize } = useRwd();
  const history = useHistory();
  const { alert } = useNotifications();

  return (
    <DepositContainer>
      {isDesktopSize && <UserWalletInfo />}

      {!isDesktopSize && <TransferTabs />}
      <AccountPaper pageName={i18n.t("common.deposit")} iconUrl={iconDeposit}>
        <Manual appHistory={history} alert={alert} />;
      </AccountPaper>
    </DepositContainer>
  );
};

export default DepositManual;
