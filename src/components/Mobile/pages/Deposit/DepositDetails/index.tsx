import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import Details from "@/components/_Share_Domain/Account/DepositPrev/Details";

const DepositContainer = styled.div`
  padding: 20px 24px;
`;

type Props = {};
const DepositDetails = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  return (
    <DepositContainer>
      <Details appHistory={history} alert={alert} />;
    </DepositContainer>
  );
};

export default DepositDetails;
