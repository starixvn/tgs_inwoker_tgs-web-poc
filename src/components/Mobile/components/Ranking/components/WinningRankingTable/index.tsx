import React from "react";
import {
  RankingTable,
  RankingTableTitle,
  RankTableBody,
  RankTableCol,
  RankTableRow,
} from "@/components/Mobile/components/Ranking/styles";
import FlipMove from "react-flip-move";
import RankItemRow, {
  RankItem,
} from "@/components/Mobile/components/Ranking/components/WinningRankingTable/RankItemRow";

type Props = {
  leaderboard: RankItem[];
};
const WinningRankingTable = ({ leaderboard }: Props) => {
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
          {leaderboard.map((rankItem, index) => {
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
