import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import Payment from "@/domain/Account/DepositPrev/Payment";

const DepositContainer = styled.div`
  padding: 20px 24px;
`;

type Props = {};
const Deposit = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  return (
    <DepositContainer>
      <Payment appHistory={history} alert={alert} />;
    </DepositContainer>
  );
};

export default Deposit;
