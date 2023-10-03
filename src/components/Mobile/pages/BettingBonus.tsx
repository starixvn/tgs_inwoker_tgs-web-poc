import CurrentLevelBanner from "@/components/Mobile/components/BettingBonus/CurrentLevelBanner";
import LevelTable from "@/components/Mobile/components/BettingBonus/LevelTable";
import styled from "styled-components";
import useVipStore, { VipData as TypeVipData } from "../hooks/useVipStore";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

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
  name: string;
  rebate: number[];
}

const BettingBonus = () => {
  const { vipData, isLoading } = useVipStore();
  const accountStore = useAccountStore();
  const currentLevel = accountStore.account.info.member_level_id;

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
          const rebate = (vipLevelData as Record<string, number>)[columnName];
          return rebate;
        } else {
          // Handle the case where the columnName is not found in vipLevelData
          return 0;
        }
      });
      return {
        name: product,
        rebate: productRebateList,
      };
    }
  );

  if (isLoading) return "isLoading"; // TODO: handle loading ui
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
