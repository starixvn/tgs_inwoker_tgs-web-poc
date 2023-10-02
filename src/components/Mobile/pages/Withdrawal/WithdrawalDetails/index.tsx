import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import Details from "@/components/_Share_Domain/Account/WithdrawalPrev/Details";
import { useLocation } from "react-router";

const WithdrawalDetailContainer = styled.div`
  padding: 20px 24px;
`;

type Props = {};
const WithdrawalDetails = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  const location = useLocation();
  const order = location.state?.order || null;

  return (
    <WithdrawalDetailContainer>
      <Details appHistory={history} alert={alert} order={order} />;
    </WithdrawalDetailContainer>
  );
};

export default WithdrawalDetails;
