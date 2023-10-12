import React, { forwardRef } from "react";
import {
  RankTableCol,
  RankTableRow,
} from "@/components/Mobile/components/Ranking/styles";
import ranking_1 from "@/assets/images/home/mobile/ranking_1.svg";
import ranking_2 from "@/assets/images/home/mobile/ranking_2.svg";
import ranking_3 from "@/assets/images/home/mobile/ranking_3.svg";
import styled from "styled-components";

const GameLabelContainer = styled.div`
  width: 28px;
  text-align: center;
`;

export interface RankItem {
  key: string;
  gameName: string;
  playerName: string;
  amount: number;
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
  rankItem: RankItem;
};
const RecordItemRow = forwardRef(({ rank, rankItem }: Props, ref) => {
  const { gameName, playerName, amount } = rankItem;

  return (
    <RankTableRow ref={ref}>
      <RankTableCol>
        {/*<GameLabel gameName={gameName} />*/}
        {gameName}
      </RankTableCol>
      <RankTableCol>{playerName}</RankTableCol>
      <RankTableCol>{amount}</RankTableCol>
    </RankTableRow>
  );
});

export default RecordItemRow;

function getGameIconUrl(gameName: string) {
  switch (gameName) {
    default:
      return ranking_1;
  }
}
