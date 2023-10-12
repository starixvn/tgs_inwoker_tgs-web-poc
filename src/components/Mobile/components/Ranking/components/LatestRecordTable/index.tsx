import React from "react";
import {
  RankingTable,
  RankingTableTitle,
  RankTableBody,
  RankTableCol,
  RankTableRow,
} from "@/components/Mobile/components/Ranking/styles";
import FlipMove from "react-flip-move";
import { useLatestRecordList } from "@/components/Mobile/components/Ranking/hooks/useLatestRecordList";
import RecordItemRow from "@/components/Mobile/components/Ranking/components/RecordItemRow";

type Props = {};
const LatestRecordTable = (props: Props) => {
  const { recordList } = useLatestRecordList();

  return (
    <RankingTable>
      <RankingTableTitle>
        <RankTableRow>
          <RankTableCol>Game</RankTableCol>
          <RankTableCol>Player</RankTableCol>
          <RankTableCol>Profit</RankTableCol>
        </RankTableRow>
      </RankingTableTitle>
      <RankTableBody>
        <FlipMove style={{ width: "100%" }}>
          {recordList.map((rankItem, index) => {
            return (
              <RecordItemRow
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

export default LatestRecordTable;
