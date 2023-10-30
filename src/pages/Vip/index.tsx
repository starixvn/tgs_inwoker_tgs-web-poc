import { useAccountStore } from "@/hooks/stores/useAccountStore";
import useVipStore from "@/hooks/useVipStore";
import { media } from "@/theme/breakpoints";
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
  background-color: ${(props) => props.theme.primaryDark};
  color: ${(props) => props.theme.white};
  box-sizing: border-box;

   ${media.sm} {
    max-width: 870px;
    margin: 0 auto;
    scroll-snap-type: unset;
    &::-webkit-scrollbar {
      width: 10px;
	    background-color: #1d1d1d40;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
      border-radius: 8px;
      background: ${(props) => props.theme.primaryLight};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background-color: ${(props) => props.theme.tertiary};
    }
  }
`;

const VIP = () => {
  const { vipData, isLoading } = useVipStore();
  const accountStore = useAccountStore();
  const [vipSortingData, setVipSortingData] = useState<VipCardItem[]>([]);
  const accountLevel = 4;
  // const accountLevel = accountStore.account.info.member_level_id;

  useEffect(() => {
    if (!isLoading && levelItemStyleList) {
      const vipList =
        vipData &&
        vipData.sort((a, b) => {
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
  console.log("accountLevel", accountLevel)
  return (
    <VipScrollableContainer>
      {updatedVipSortingData &&
        updatedVipSortingData.map((vipCardItem, index) => {
          const isCurrentLevel = index === accountLevel - 1;
          console.log("vipCardItem", vipCardItem)
          return (
            <VipSingleItem
              key={vipCardItem.levelStyle.level}
              isCurrentLevel={isCurrentLevel}
              vipCardItem={vipCardItem}
            />
          );
        })}
    </VipScrollableContainer>
  );
};

export default VIP;
