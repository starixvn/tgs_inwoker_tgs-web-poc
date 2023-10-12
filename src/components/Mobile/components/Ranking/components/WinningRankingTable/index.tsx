import React, { useEffect, useMemo, useState } from "react";
import ranking_1 from "@/assets/images/home/mobile/ranking_1.svg";
import {
  RankingTable,
  RankingTableTitle,
  RankTableBody,
  RankTableCol,
  RankTableRow,
} from "@/components/Mobile/components/Ranking/styles";
import FlipMove from "react-flip-move";
import RankItemRow from "@/components/Mobile/components/Ranking/components/RankItemRow";
import { useWinningRankingList } from "@/components/Mobile/components/Ranking/hooks/useWinningRankingList";

type Props = {};
const WinningRankingTable = (props: Props) => {
  const { rankList } = useWinningRankingList();

  return (
    <RankingTable>
      <RankingTableTitle>
        <RankTableRow>
          <RankTableCol>Rank</RankTableCol>
          <RankTableCol>Player</RankTableCol>
          <RankTableCol>Profit</RankTableCol>
        </RankTableRow>
      </RankingTableTitle>
      <RankTableBody>
        <FlipMove style={{ width: "100%" }}>
          {rankList.map((rankItem, index) => {
            return (
              <RankItemRow
                key={rankItem.key}
                rank={index + 1}
                rankItem={rankItem}
              />
            );
          })}
        </FlipMove>
      </RankTableBody>
    </RankingTable>
  );
};

export default WinningRankingTable;
