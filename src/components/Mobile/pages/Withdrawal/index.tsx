import React from "react";
import WithdrawalPrev from "@/components/_Share_Domain/Account/WithdrawalPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import TransferTabs from "@/components/_Share_Domain/Account/DepositPrev/components/TransferTabs";

const Container = styled.div`
  width: 100%;
  padding: 20px 27px;
`;

type Props = {};
const Withdrawal = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();

  return (
    <Container>
      <TransferTabs />
      <WithdrawalPrev appHistory={history} alert={alert} />;
    </Container>
  );
};

export default Withdrawal;
