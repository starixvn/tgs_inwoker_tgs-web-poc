import React, { useState } from "react";
import ranking_1 from "@/assets/t18/images/home/mobile/ranking_1.svg";
import rubyIcon from "@/assets/t18/images/home/mobile/ruby.svg";
import styled from "styled-components";
import { rankingTabList } from "../../constants/tab";
import TabButton from "./TabButton";
import WinningRankingTable from "@/components/Ranking/WinningRankingTable";
import LatestRecordTable from "@/components/Ranking/LatestRecordTable";
import { useBettingHistory } from "@/components/Ranking/hooks/useBettingHistory";
import { RankItem } from "@/components/Ranking/components/RankItemRow";
import { v4 as uuidv4 } from "uuid";

type Props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const RankingContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const RankingTabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const TabPanel = () => {
  const [activeRankingTab, setActiveRankingTab] = useState(rankingTabList[0]);
  const { betRecordList, leaderboard } = useBettingHistory();

  return (
    <RankingContainer>
      <RankingTabs>
        {rankingTabList.map((text: string) => (
          <TabButton
            key={text}
            text={text}
            isActive={text === activeRankingTab}
            onClick={() => setActiveRankingTab(text)}
          />
        ))}
      </RankingTabs>

      {activeRankingTab === "Latest Record" && (
        <LatestRecordTable betRecordList={betRecordList} />
      )}

      {activeRankingTab === "Winning Ranking" && (
        <WinningRankingTable leaderboard={leaderboard} />
      )}
    </RankingContainer>
  );
};

export default TabPanel;
