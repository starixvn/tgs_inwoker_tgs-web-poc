import { useEffect, useState } from "react";
import { RankItem } from "@/components/Mobile/components/Ranking/components/RankItemRow";
import ranking_1 from "@/assets/images/home/mobile/ranking_1.svg";

export function useLatestRecordList() {
  const [recordList, setRecordList] = useState<any[]>([
    {
      key: "001",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 9999,
    },
    {
      key: "002",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 400,
    },
    {
      key: "003",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 500,
    },
    {
      key: "004",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 800,
    },
    {
      key: "005",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 20,
    },
    {
      key: "006",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 100,
    },
    {
      key: "008",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 1000,
    },
    {
      key: "017",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 9999,
    },
    {
      key: "012",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 9999,
    },
    {
      key: "013",
      gameName: "Crash",
      playerName: "ED***1k",
      amount: 4000,
    },
  ]);

  // useEffect(() => {
  //   setInterval(() => {
  //     setRankList((prevState) => {
  //       const newArr = [...prevState];
  //
  //       newArr.push({
  //         key: `${Math.floor(Math.random() * 1000000)}`,
  //         gameIconUrl: ranking_1,
  //         playerName: "ED***1k",
  //         amount: 9999,
  //       });
  //
  //       return newArr;
  //     });
  //   }, 1000);
  // }, []);

  return { recordList };
}
