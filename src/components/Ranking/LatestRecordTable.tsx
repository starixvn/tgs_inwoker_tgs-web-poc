import React from "react";
import {
  RankingTable,
  RankingTableTitle,
  RankTableBody,
  RankTableCol,
  RankTableRow,
} from "@/components/Ranking/styles";
import FlipMove from "react-flip-move";
import BetRecordRow, {
  BetRecord,
} from "@/components/Ranking/components/BetRecordRow";

type Props = {
  betRecordList: BetRecord[];
};
const LatestRecordTable = ({ betRecordList }: Props) => {
  return (
    <RankingTable>
      <RankingTableTitle>
        <RankTableRow>
          <RankTableCol>Game</RankTableCol>
          <RankTableCol>Player</RankTableCol>
          <RankTableCol>Amount</RankTableCol>
        </RankTableRow>
      </RankingTableTitle>
      <RankTableBody>
        <FlipMove style={{ width: "100%" }}>
          {betRecordList.map((betRecord, index) => {
            return (
              <BetRecordRow
                key={betRecord.key}
                rank={index + 1}
                betRecord={betRecord}
              />
            );
          })}
        </FlipMove>
      </RankTableBody>
    </RankingTable>
  );
};

export default LatestRecordTable;
