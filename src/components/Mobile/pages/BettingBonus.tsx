import CurrentLevelBanner from "@/components/Mobile/components/BettingBonus/CurrentLevelBanner";
import LevelTable from "@/components/Mobile/components/BettingBonus/LevelTable";
import styled from "styled-components";
import Loading from "@/components/UI/Loading";
import { useBettingBonus } from "@/hooks/betting-bonus/useBettingBonus";
import { media } from "@/theme/breakpoints";

const Container = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.sm} {
    max-width: 870px;
    margin: 0 auto;
  }
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
