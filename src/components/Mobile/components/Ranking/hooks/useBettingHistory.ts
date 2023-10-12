import { useEffect, useState } from "react";
import { userList } from "@/components/Mobile/components/Ranking/mocks/userList";
import { RankItem } from "@/components/Mobile/components/Ranking/components/WinningRankingTable/RankItemRow";
import { BetRecord } from "@/components/Mobile/components/Ranking/components/LatestRecordTable/BetRecordRow";
import { v4 as uuidv4 } from "uuid";
import { gameList } from "@/components/Mobile/components/Ranking/mocks/gameList";

const storedBetRecordList = JSON.parse(
  localStorage.getItem("betRecordList") || "[]"
);
const storedLeaderboard = JSON.parse(
  localStorage.getItem("leaderboard") || "[]"
);
const storedUserBetDictionary = JSON.parse(
  localStorage.getItem("userBetDictionary") || "{}"
);

const userBetDictionary: { [key in string]: RankItem } =
  storedUserBetDictionary;

export function useBettingHistory() {
  const [betRecordList, setBetRecordList] =
    useState<BetRecord[]>(storedBetRecordList);
  const [leaderboard, setLeaderboard] = useState<RankItem[]>(storedLeaderboard);

  useEffect(() => {
    // 初始化 betRecordList 和 leaderboard，如果有本地存儲的數據，則從本地存儲恢復
    const initializeData = () => {
      const storedBetRecordList = localStorage.getItem("betRecordList");
      const storedLeaderboard = localStorage.getItem("leaderboard");

      if (storedBetRecordList) {
        setBetRecordList(JSON.parse(storedBetRecordList));
      }

      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    };

    initializeData();
  }, []);

  const generateBetRecord = (): BetRecord => {
    const key = uuidv4();
    const gameName = gameList[Math.floor(Math.random() * gameList.length)];
    const playerName = userList[Math.floor(Math.random() * userList.length)];
    const betAmount = Math.floor(Math.random() * 100) * 5;

    return { gameName, playerName, betAmount, key };
  };

  // bet history
  const generateFakeBetHistory = () => {
    const newBetRecord = generateBetRecord();
    const updatedBetRecordList = [newBetRecord, ...betRecordList].slice(0, 10);
    setBetRecordList(updatedBetRecordList);

    // 將更新的資料保存到本地存儲
    localStorage.setItem("betRecordList", JSON.stringify(updatedBetRecordList));
  };

  // leader board
  const updateLeaderboard = () => {
    betRecordList.forEach((record) => {
      const { playerName, betAmount } = record;

      if (userBetDictionary[playerName]) {
        userBetDictionary[playerName] = {
          ...userBetDictionary[playerName],
          betAmount:
            (userBetDictionary[playerName]?.betAmount || 0) + betAmount,
        };
      } else {
        userBetDictionary[playerName] = {
          key: uuidv4(),
          playerName: playerName,
          betAmount: betAmount,
        };
      }
    });

    console.log(userBetDictionary);
    const sortedLeaderboard = Object.values(userBetDictionary)
      .sort((a, b) => b[1]?.betAmount - a[1]?.betAmount)
      .slice(0, 10) as RankItem[];

    setLeaderboard(sortedLeaderboard);
    console.log(sortedLeaderboard);

    // 將更新的排行榜保存到本地存儲
    localStorage.setItem("leaderboard", JSON.stringify(sortedLeaderboard));
    localStorage.setItem(
      "userBetDictionary",
      JSON.stringify(userBetDictionary)
    );
  };

  // fake timing
  const [bettingToggle, setBettingToggle] = useState(false);
  const generateRandomInterval = () => {
    return Math.floor(Math.random() * 47000) + 3000; // 3秒到50秒之間的亂數
  };

  useEffect(() => {
    let timeout: any;

    const bettingTimeout = () => {
      setBettingToggle((prevState) => !prevState);
      timeout = setTimeout(bettingTimeout, generateRandomInterval());
    };

    timeout = setTimeout(bettingTimeout, generateRandomInterval());

    return () => {
      clearTimeout(timeout);
    };
  }, [bettingToggle]);

  useEffect(() => {
    generateFakeBetHistory();
    updateLeaderboard();
  }, [bettingToggle]);
  return {
    betRecordList,
    leaderboard,
  };
}
