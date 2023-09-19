import ranking_1 from "@/assets/images/home/mobile/ranking_1.svg";
import rubyIcon from "@/assets/images/home/mobile/ruby.svg";
import { useState } from 'react';
import styled from 'styled-components';
import { rankingTabList } from "../../constants/tab";
import TabButton from "./TabButton";

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

const RankingTabWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const RankingTabTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.tertiary};
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 0.875rem;
    margin: 20px 0;
`;

const RankingTabContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.white};
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 0.875rem;
`;

const RankItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TabPanel = () => {
    const [activeRankingTab, setActiveRankingTab] = useState(rankingTabList[0]);

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

            {
                activeRankingTab === "Latest Record" && <RankingTabWrapper>
                    <RankingTabTitle>
                        <RankItem>Game</RankItem>
                        <RankItem>Player</RankItem>
                        <RankItem>Amount</RankItem>
                    </RankingTabTitle>
                    <RankingTabContent>
                        <RankItem><img src={rubyIcon} alt={"game"} />Crash</RankItem>
                        <RankItem>ED***1k</RankItem>
                        <RankItem>98.2</RankItem>
                    </RankingTabContent>
                </RankingTabWrapper>
            }

            {
                activeRankingTab === "Winning Ranking" && <RankingTabWrapper>
                    <RankingTabTitle>
                        <RankItem>Rank</RankItem>
                        <RankItem>Player</RankItem>
                        <RankItem>Profit</RankItem>
                    </RankingTabTitle>
                    <RankingTabContent>
                        <RankItem><img src={ranking_1} alt={"rank"} /></RankItem>
                        <RankItem>ED***1k</RankItem>
                        <RankItem>9999</RankItem>
                    </RankingTabContent>
                </RankingTabWrapper>
            }
        </RankingContainer>
    );
};

export default TabPanel;