import React, { forwardRef } from "react";
import {
  RankTableCol,
  RankTableRow,
} from "@/components/Mobile/components/Ranking/styles";
import ranking_1 from "@/assets/images/home/mobile/ranking_1.svg";
import ranking_2 from "@/assets/images/home/mobile/ranking_2.svg";
import ranking_3 from "@/assets/images/home/mobile/ranking_3.svg";
import styled from "styled-components";

const RankLabelContainer = styled.div`
  width: 28px;
  text-align: center;
`;

export interface RankItem {
  key: string;
  playerName: string;
  betAmount: number;
}

const RankLabel = ({ rank }: { rank: number }) => {
  const RankContent = () => {
    switch (rank) {
      case 1:
        return <img src={ranking_1} alt={"ranking_1"} />;
      case 2:
        return <img src={ranking_2} alt={"ranking_2"} />;
      case 3:
        return <img src={ranking_3} alt={"ranking_3"} />;
      default:
        return <span>{rank}</span>;
    }
  };

  return (
    <RankLabelContainer>
      <RankContent />
    </RankLabelContainer>
  );
};

type Props = {
  rank: number;
  rankItem: RankItem;
};
const RankItemRow = forwardRef(({ rank, rankItem }: Props, ref) => {
  const { playerName, betAmount } = rankItem;

  return (
    <RankTableRow ref={ref}>
      <RankTableCol>
        <RankLabel rank={rank} />
      </RankTableCol>
      <RankTableCol>{playerName}</RankTableCol>
      <RankTableCol>{betAmount}</RankTableCol>
    </RankTableRow>
  );
});

export default RankItemRow;
