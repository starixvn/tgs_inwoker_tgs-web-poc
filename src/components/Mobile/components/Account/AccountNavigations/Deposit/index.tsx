import React from "react";
import DepositPrev from "@/components/Mobile/components/_Share/Account/DepositPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/useNotifications";
import styled from "styled-components";

const DepositContainer = styled.div`
  padding: 20px 24px;
`;

type Props = {};
const Deposit = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  return (
    <DepositContainer>
      <DepositPrev appHistory={history} alert={alert} />;
    </DepositContainer>
  );
};

export default Deposit;
