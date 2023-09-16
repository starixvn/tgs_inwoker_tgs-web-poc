import React from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const BalanceTrackerContainer = styled.div`
  background: ${theme.primaryDark};
  color: white;
  border-radius: 10px;
  border: 1px solid ${theme.tertiary};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0;
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;

  & span {
    margin-right: 10px;
  }
`;

const DepositButtonContainer = styled.div`
  background: linear-gradient(180deg, #922acf 0%, #2f26ad 100%);
  border-radius: 5px;
  width: 39px;
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DepositButton = () => {
  return (
    <DepositButtonContainer>
      <AddIcon />
    </DepositButtonContainer>
  );
};

type Props = {};
const BalanceTracker = (props: Props) => {
  const currentbalance = 0;

  return (
    <BalanceTrackerContainer>
      <span>Balance</span>

      <BalanceContainer>
        <span>R$ 0.00</span>
        <DepositButton />
      </BalanceContainer>
    </BalanceTrackerContainer>
  );
};

export default BalanceTracker;
