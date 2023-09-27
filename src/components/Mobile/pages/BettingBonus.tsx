import CurrentLevelBanner from "@/components/Mobile/components/BettingBonus/CurrentLevelBanner";
import LevelTable from "@/components/Mobile/components/BettingBonus/LevelTable";
import styled from "styled-components";
import useVipStore, { VipData as TypeVipData } from "../hooks/useVipStore";

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

const productList = [
  "Live Dealer",
  "Sports book",
  "E-Game",
  "Card Game",
  "Lottery",
  "Virtual Sports",
];

const productColumnNameMap: {
  [key: string]: string;
} = {
  "Live Dealer": "liveDealerRebate",
  "Sports book": "sportsRebate",
  "E-Game": "egameRebate",
  "Card Game": "cardGameRebate",
  Lottery: "lotteryRebate",
  "Virtual Sports": "virtualSportsRebate",
};
export interface TypeProductRebateByLevel {
  [key: string]: number[];
}

export interface LevelList {
  name: string;
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
  level6: string;
  level7: string;
  level8: string;
  level9: string;
  level10: string;
}

// fake data
const currentLevelListByGame: LevelList[] = [
  {
    name: "Live Dealer",
    level1: "0.20%",
    level2: "0.25%",
    level3: "0.30%",
    level4: "0.35%",
    level5: "0.40%",
    level6: "0.45%",
    level7: "0.50%",
    level8: "0.55%",
    level9: "0.60%",
    level10: "0.65%",
  },
  {
    name: "Sports book",
    level1: "0.20%",
    level2: "0.25%",
    level3: "0.30%",
    level4: "0.35%",
    level5: "0.40%",
    level6: "0.45%",
    level7: "0.50%",
    level8: "0.55%",
    level9: "0.60%",
    level10: "0.65%",
  },
  {
    name: "E-Game",
    level1: "0.20%",
    level2: "0.25%",
    level3: "0.30%",
    level4: "0.35%",
    level5: "0.40%",
    level6: "0.45%",
    level7: "0.50%",
    level8: "0.55%",
    level9: "0.60%",
    level10: "0.65%",
  },
  {
    name: "Card Game",
    level1: "0.20%",
    level2: "0.25%",
    level3: "0.30%",
    level4: "0.35%",
    level5: "0.40%",
    level6: "0.45%",
    level7: "0.50%",
    level8: "0.55%",
    level9: "0.60%",
    level10: "0.65%",
  },
  {
    name: "Lottery",
    level1: "0.20%",
    level2: "0.25%",
    level3: "0.30%",
    level4: "0.35%",
    level5: "0.40%",
    level6: "0.45%",
    level7: "0.50%",
    level8: "0.55%",
    level9: "0.60%",
    level10: "0.65%",
  },
  {
    name: "Virtual Sports",
    level1: "0.20%",
    level2: "0.25%",
    level3: "0.30%",
    level4: "0.35%",
    level5: "0.40%",
    level6: "0.45%",
    level7: "0.50%",
    level8: "0.55%",
    level9: "0.60%",
    level10: "0.65%",
  },
];

const BettingBonus = () => {
  const { vipData, isLoading } = useVipStore();

  const productList = Object.keys(productColumnNameMap);
  const productRebateByLevel: TypeProductRebateByLevel[] = productList.map(
    (product) => {
      const productRebateList = vipData.map((_, index) => {
        const targetLevel = index + 1;
        const vipLevelData = vipData.find(
          (item) => item.level === targetLevel
        ) as TypeVipData;

        const columnName = productColumnNameMap[product];

        if (vipLevelData && columnName in vipLevelData) {
          const rebate = vipLevelData[columnName] as number;
          return rebate;
        } else {
          // Handle the case where the columnName is not found in vipLevelData
          return 0;
        }
      });
      return {
        [product]: productRebateList,
      };
    }
  );

  console.log("%c⧭", "color: #731d6d", "rebateByLevel", productRebateByLevel);
  if (isLoading) return "isLoading"; // TODO: handle loading ui
  return (
    <Container>
      <CurrentLevelBanner currentLevelListByGame={currentLevelListByGame} />
      <TitleText>Ratio of Bet Bonus</TitleText>
      <LevelTable productRebateByLevel={productRebateByLevel} />
    </Container>
  );
};

export default BettingBonus;
