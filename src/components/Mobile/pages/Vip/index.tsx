import useVipStore from "@/components/Mobile/hooks/useVipStore";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { levelItemStyleList } from "../../constants/vip";
import VipSingleItem, { VipCardItem } from "./VipSingleItem";

const VipScrollableContainer = styled.div`
    width: 100%;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    padding: 20px;
    margin: 0 20px;
    background-color: ${(props: { theme: { primaryDark: any; }; }) => props.theme.primaryDark};
    color: ${(props: { theme: { white: any; }; }) => props.theme.white};
`;

const VIP = () => {
  const { vipData, isLoading } = useVipStore();
  const accountStore = useAccountStore();
  const [vipSortingData, setVipSortingData] = useState<VipCardItem[]>([])
  const accountLevel = accountStore.account.info.member_level_id;

  useEffect(() => {
    if (!isLoading && levelItemStyleList) {
      const vipList =
        vipData && vipData.sort((a, b) => {
          return a.level < b.level ? -1 : a.level > b.level ? 1 : 0;
        });

      setVipSortingData(vipList);
    }
  }, [levelItemStyleList, isLoading, vipData]);

  const numberOfLevels = vipSortingData.length;
  const levelItems = levelItemStyleList.slice(0, numberOfLevels);
  // 將 levelItems 中對應索引的等級資料添加到 sortingItem 中
  const updatedVipSortingData = vipSortingData.map((sortingItem, index) => {
    sortingItem.levelStyle = levelItems[index];
    return sortingItem;
  });

  // to-do: 多抽一層資料處理hooks/vip for useVipDataHandler.ts 把資料和UI切分乾淨

  return (
    <VipScrollableContainer>
      {updatedVipSortingData && updatedVipSortingData.map((vipCardItem, index) => {
        const isCurrentLevel = index === (accountLevel - 1);

        return <VipSingleItem key={vipCardItem.levelStyle.level} isCurrentLevel={isCurrentLevel} vipCardItem={vipCardItem} />
      })}
    </VipScrollableContainer >
  )
}

export default VIP;