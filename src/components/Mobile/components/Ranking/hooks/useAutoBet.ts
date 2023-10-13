import { BetRecord } from "@/components/Mobile/components/Ranking/components/BetRecordRow";
import { v4 as uuidv4 } from "uuid";
import { userList } from "@/components/Mobile/components/Ranking/mocks/userList";
import { useAutoBettingToggle } from "@/components/Mobile/components/Ranking/hooks/useAutoBettingToggle";
import { useEffect, useState } from "react";
import { mockBetRecordList } from "@/components/Mobile/components/Ranking/mocks/betRecordList";
import { gameTypeList } from "@/components/Mobile/constants/tab";

function getRandomBetAmount() {
  const amountStatus = Math.floor(Math.random() * 10);
  if (amountStatus < 3) {
    return Math.floor(Math.random() * 10) || 1;
  } else if (amountStatus < 6) {
    return Math.floor(Math.random() * 30) * 5 || 1;
  } else if (amountStatus < 9) {
    return Math.floor(Math.random() * 20) * 10 || 1;
  } else {
    return Math.floor(Math.random() * 100) * 10 || 1;
  }
}

function getRandomGameType() {
  const randomGameType =
    gameTypeList[Math.floor(Math.random() * gameTypeList.length)];

  return randomGameType.text;
}

const initialBetRecordList: BetRecord[] = localStorage.getItem("betRecordList")
  ? JSON.parse(localStorage.getItem("betRecordList"))
  : mockBetRecordList;

export function useAutoBet() {
  const [betRecordList, setBetRecordList] =
    useState<BetRecord[]>(initialBetRecordList);
  const [latestBetRecord, setLatestBetRecord] = useState(
    initialBetRecordList[initialBetRecordList.length - 1]
  );

  const generateSingleBetRecord = (): BetRecord => {
    const key = uuidv4();
    const gameName = getRandomGameType();
    const playerName = userList[Math.floor(Math.random() * userList.length)];
    const betAmount = getRandomBetAmount();

    return { gameName, playerName, betAmount, key };
  };

  const generateFakeBetHistory = () => {
    const newBetRecord = generateSingleBetRecord();
    setLatestBetRecord(newBetRecord);

    const updatedBetRecordList = [newBetRecord, ...betRecordList].slice(0, 10);
    setBetRecordList(updatedBetRecordList);

    localStorage.setItem("betRecordList", JSON.stringify(updatedBetRecordList));
  };

  // continue auto bet
  const { autoBettingToggle } = useAutoBettingToggle();
  useEffect(() => {
    generateFakeBetHistory();
  }, [autoBettingToggle]);

  return {
    betRecordList,
    latestBetRecord,
  };
}
