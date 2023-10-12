import React from "react";
import Loading from "@/components/Mobile/components/UI/Loading";
import CurrentLevelBanner from "@/components/Mobile/components/BettingBonus/CurrentLevelBanner";
import { useBettingBonus } from "@/hooks/betting-bonus/useBettingBonus";
import styled from "styled-components";

const AccountLevelInfoContainer = styled.div`
  padding: 15px 0 0;
  display: flex;
  justify-content: center;

  & > * {
    margin-bottom: 8px;
  }
`;

type Props = {};
const MyInfo = (props: Props) => {
  const { isLoading, currentLevel, productRebateByLevel } = useBettingBonus();

  return (
    <AccountLevelInfoContainer>
      {isLoading ? (
        <Loading />
      ) : (
        <CurrentLevelBanner
          level={currentLevel}
          productRebateByLevel={productRebateByLevel}
        />
      )}
    </AccountLevelInfoContainer>
  );
};

export default MyInfo;
