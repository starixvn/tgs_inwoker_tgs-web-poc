import { useAutoBet } from "@/components/Ranking/hooks/useAutoBet";
import { useLeaderboard } from "@/components/Ranking/hooks/useLeaderboard";

export function useBettingHistory() {
  const { betRecordList, latestBetRecord } = useAutoBet();
  const { leaderboard } = useLeaderboard(latestBetRecord);

  return {
    betRecordList,
    leaderboard,
  };
}
