import { useState } from "react";
import { RankItem } from "@/components/Mobile/components/Ranking/components/RankItemRow";

export function useWinningRankingList() {
  const [rankList, setRankList] = useState<RankItem[]>([
    {
      key: "001",
      playerName: "ED***1k",
      amount: 9999,
    },
    {
      key: "002",
      playerName: "ED***1k",
      amount: 400,
    },
    {
      key: "003",
      playerName: "ED***1k",
      amount: 500,
    },
    {
      key: "004",
      playerName: "ED***1k",
      amount: 800,
    },
    {
      key: "005",
      playerName: "ED***1k",
      amount: 20,
    },
    {
      key: "006",
      playerName: "ED***1k",
      amount: 100,
    },
    {
      key: "008",
      playerName: "ED***1k",
      amount: 1000,
    },
    {
      key: "017",
      playerName: "ED***1k",
      amount: 9999,
    },
    {
      key: "012",
      playerName: "ED***1k",
      amount: 9999,
    },
    {
      key: "013",
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

  return { rankList };
}
