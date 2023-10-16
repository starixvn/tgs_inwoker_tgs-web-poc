import React from "react";
import CurrentLevelBanner from "@/components/Mobile/components/BettingBonus/CurrentLevelBanner";
import LevelTable from "@/components/Mobile/components/BettingBonus/LevelTable";
import styled from "styled-components";
import useVipStore from "../hooks/useVipStore";
import { VipData as TypeVipData } from "@/models/dto/general/GetVipResDto";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import Loading from "@/components/Mobile/components/UI/Loading";
import { useBettingBonus } from "@/hooks/betting-bonus/useBettingBonus";

const Container = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.div`
  width: 100%;
  margin-top: 20px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-align: start;
`;

export interface TypeProductRebateByLevel {
  name: string;
  rebate: number[];
}

const BettingBonus = () => {
  const { isLoading, currentLevel, productRebateByLevel } = useBettingBonus();

  if (isLoading) return <Loading show={true} />;
  return (
    <Container>
      <CurrentLevelBanner
        level={currentLevel}
        productRebateByLevel={productRebateByLevel}
      />
      <TitleText>Ratio of Bet Bonus</TitleText>
      <LevelTable
        currentLevel={currentLevel}
        productRebateByLevel={productRebateByLevel}
      />
    </Container>
  );
};

export default BettingBonus;
