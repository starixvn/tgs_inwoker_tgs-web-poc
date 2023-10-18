import React from "react";
import DepositPrev from "@/domain/Account/DepositPrev";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import { useLocation } from "react-router";
import TransferTabs from "@/domain/Account/DepositPrev/components/TransferTabs";
import { useRwd } from "@/hooks/useRwd";

const DepositContainer = styled.div`
  padding: 20px 24px;
`;

type Props = {};
const DepositPage = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const location = useLocation();
  const order = location.state?.order || null;

  return (
    <DepositContainer>
      <TransferTabs />
      <DepositPrev appHistory={history} alert={alert} order={order} />;
    </DepositContainer>
  );
};

export default DepositPage;
