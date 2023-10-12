import { useEffect, useState } from "react";
import { RankItem } from "@/components/Mobile/components/Ranking/components/RankItemRow";
import { mockUserBetDictionary } from "@/components/Mobile/components/Ranking/mocks/userBetDictionary";
import { BetRecord } from "@/components/Mobile/components/Ranking/components/BetRecordRow";
import { mockLeaderboard } from "@/components/Mobile/components/Ranking/mocks/leaderboard";

// this dictionary is used for calculate rank
const userBetDictionary: { [key in string]: RankItem } = localStorage.getItem(
  "userBetDictionary"
)
  ? JSON.parse(localStorage.getItem("userBetDictionary"))
  : mockUserBetDictionary;

const initialLeaderboard: RankItem[] = localStorage.getItem("leaderboard")
  ? JSON.parse(localStorage.getItem("leaderboard"))
  : mockLeaderboard;

export function useLeaderboard(latestBetRecord: BetRecord) {
  // leader board
  const [overallLeaderboard, setOverallLeaderboard] =
    useState<RankItem[]>(initialLeaderboard);

  const updateLeaderboard = () => {
    // userBetDictionary stores about 30 rankItems
    // if new betRecord belongs one of them, then add up its betAmount
    // or just skip update leaderboard
    if (!userBetDictionary[latestBetRecord?.playerName]) return;

    Object.values(userBetDictionary).forEach((rankItem) => {
      if (rankItem.playerName === latestBetRecord.playerName) {
        rankItem.betAmount += latestBetRecord.betAmount;
      }
    });

    const sortedLeaderboardList = Object.values(
      userBetDictionary
    ) as RankItem[];

    sortedLeaderboardList.sort((a, b) => b.betAmount - a.betAmount);
    sortedLeaderboardList.slice(0, 10);

    setOverallLeaderboard(sortedLeaderboardList);

    localStorage.setItem("leaderboard", JSON.stringify(sortedLeaderboardList));
    localStorage.setItem(
      "userBetDictionary",
      JSON.stringify(userBetDictionary)
    );
  };

  useEffect(() => {
    updateLeaderboard();
  }, [latestBetRecord]);

  const displayedLeaderboard = overallLeaderboard.slice(0, 10);
  return { leaderboard: displayedLeaderboard };
}
