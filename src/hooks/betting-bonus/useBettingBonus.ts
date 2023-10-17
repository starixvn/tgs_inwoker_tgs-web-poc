import useVipStore from "@/hooks/useVipStore";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { VipData as TypeVipData } from "@/models/dto/general/GetVipResDto";
import { TypeProductRebateByLevel } from "@/pages/BettingBonus";

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

export function useBettingBonus() {
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
          const rebate = vipLevelData[columnName as keyof TypeVipData];
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

  return {
    isLoading,
    currentLevel,
    productRebateByLevel,
  };
}
