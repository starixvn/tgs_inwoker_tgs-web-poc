import React, { forwardRef } from "react";
import {
  RankTableCol,
  RankTableRow,
} from "@/components/Mobile/components/Ranking/styles";
import ranking_1 from "@/assets/images/home/mobile/ranking_1.svg";
import ranking_2 from "@/assets/images/home/mobile/ranking_2.svg";
import ranking_3 from "@/assets/images/home/mobile/ranking_3.svg";
import styled from "styled-components";
import MaskPlayerName from "@/components/Mobile/components/Ranking/components/MaskPlayerName";

const GameLabelContainer = styled.div`
  width: 28px;
  text-align: center;
`;

export interface BetRecord {
  key: string;
  gameName: string;
  playerName: string;
  betAmount: number;
}

const GameLabel = ({ gameName }: { gameName: string }) => {
  const getGameIconUrl = () => {
    switch (gameName) {
      default:
        return ranking_1;
    }
  };

  return (
    <GameLabelContainer>
      <img src={getGameIconUrl()} alt={gameName} />
    </GameLabelContainer>
  );
};

type Props = {
  rank: number;
  betRecord: BetRecord;
};
const BetRecordRow = forwardRef(({ rank, betRecord }: Props, ref) => {
  const { gameName, playerName, betAmount } = betRecord;

  return (
    <RankTableRow ref={ref}>
      <RankTableCol>
        {/*<GameLabel gameName={gameName} />*/}
        {gameName}
      </RankTableCol>
      <RankTableCol>
        <MaskPlayerName playerName={playerName} />
      </RankTableCol>
      <RankTableCol>{betAmount}</RankTableCol>
    </RankTableRow>
  );
});

export default BetRecordRow;

function getGameIconUrl(gameName: string) {
  switch (gameName) {
    default:
      return ranking_1;
  }
}
