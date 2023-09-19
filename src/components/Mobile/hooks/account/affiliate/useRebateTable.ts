import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectItem } from "@/components/Mobile/components/UI/Select/DarkSelect";
import i18n from "@/utils/i18n";
import { BrandAllAgent } from "@/models/dto/general/GetBrandAllAgentResDto";
import { useAccountStore } from "@/components/Mobile/hooks/stores/useAccountStore";
import { useGeneralStore } from "@/components/Mobile/hooks/stores/useGeneralStore";

enum RebateTypeEnum {
  ALL = 0,
  SPORT = 1,
  VIRTUAL_SPORTS = 2,
  LIVE_DEALER = 5,
  CHESS = 7,
  LOTTERY = 13,
  EGAME = 15,
}

interface RebateItem {
  label: string;
  value: RebateTypeEnum;
}

const rebateItemList: RebateItem[] = [
  { value: RebateTypeEnum.SPORT, label: "sport" },
  { value: RebateTypeEnum.VIRTUAL_SPORTS, label: "virtualsports" },
  { value: RebateTypeEnum.LIVE_DEALER, label: "livedealer" },
  { value: RebateTypeEnum.CHESS, label: "chess" },
  { value: RebateTypeEnum.LOTTERY, label: "lottery" },
  { value: RebateTypeEnum.EGAME, label: "egame" },
];

export function useRebateTable() {
  const { account } = useAccountStore();
  const { getBrandAllAgent } = useGeneralStore();

  // Rebate select
  const [selectedRebateItem, setSelectedRebateItem] = useState<RebateItem>(
    rebateItemList[0]
  );

  const handleChangeSelectItem = (newSelectItem: SelectItem) => {
    setSelectedRebateItem(newSelectItem);
  };

  // Rebate table rows
  const [rebateTableRows, setRebateTableRows] = useState<BrandAllAgent[]>([]);

  const fetchRebateTable = useCallback(async () => {
    const res = await getBrandAllAgent();
    if (!res.IsSuccess) return;

    setRebateTableRows(res.data);
  }, []);

  useEffect(() => {
    fetchRebateTable().then();
  }, []);

  const rebateTableRow = useMemo(() => {
    console.log(selectedRebateItem);
    console.log(rebateTableRows);
    return rebateTableRows.filter((brandAllAgent) => {
      const currentRebateType = selectedRebateItem.value;
      if (currentRebateType === RebateTypeEnum.ALL) return true;

      return (
        brandAllAgent.allagentgametype.toString() ===
        currentRebateType.toString()
      );
    });
  }, [selectedRebateItem, rebateTableRows]);

  const affiliateLink = `https://${window.location.hostname}/p/${account.info.playercode}?do=register`;

  return {
    rebateItemList,
    selectedRebateItem,
    handleChangeSelectItem,
    rebateTableRow,
    affiliateLink,
  };
}
