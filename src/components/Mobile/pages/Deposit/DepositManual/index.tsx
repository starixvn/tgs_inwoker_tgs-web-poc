import React from "react";
import { useHistory } from "react-router-dom";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import styled from "styled-components";
import Manual from "@/components/_Share_Domain/Account/DepositPrev/Manual";

const DepositContainer = styled.div`
  padding: 20px 24px;
`;

type Props = {};
const DepositManual = (props: Props) => {
  const history = useHistory();
  const { alert } = useNotifications();
  return (
    <DepositContainer>
      <Manual appHistory={history} alert={alert} />;
    </DepositContainer>
  );
};

export default DepositManual;
