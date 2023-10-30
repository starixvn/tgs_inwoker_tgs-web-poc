import { GameTypeEnum } from "@/api-services/utils/Enum";
import cardgame from "@/assets/t18/images/home/mobile/tab/card_game.svg";
import egame from "@/assets/t18/images/home/mobile/tab/egame.svg";
import esports from "@/assets/t18/images/home/mobile/tab/esports.svg";
import fishing from "@/assets/t18/images/home/mobile/tab/fishing.svg";
import live from "@/assets/t18/images/home/mobile/tab/live_casino.svg";
import lobby from "@/assets/t18/images/home/mobile/tab/lobby.svg";
import lottery from "@/assets/t18/images/home/mobile/tab/lottery.svg";
import sabong from "@/assets/t18/images/home/mobile/tab/sabong.svg";
import slot from "@/assets/t18/images/home/mobile/tab/slot.svg";
import sports from "@/assets/t18/images/home/mobile/tab/sports.svg";
import i18n from "@/utils/i18n";
import { useEffect, useState } from "react";

type GameTypeItem = {
  key: string;
  iconUrl: string;
  text: string;
  fontSize: string;
  gameType: number;
};

export const useGameTypeList = () => {
  const [translatedGameTypeList, setTranslatedGameTypeList] = useState([]);

  useEffect(() => {
    const gameTypeList: GameTypeItem[] = [
      {
        key: "lobby",
        iconUrl: lobby,
        text: i18n.t("common.home"),
        fontSize: "small",
        gameType: 0,
      },
      {
        key: "slots",
        iconUrl: slot,
        text: i18n.t("common.slot"),
        fontSize: "small",
        gameType: GameTypeEnum.SLOT,
      },
      {
        key: "liveCasino",
        iconUrl: live,
        text: i18n.t("common.live"),
        fontSize: "smaller",
        gameType: GameTypeEnum.LIVELOBBY,
      },
      {
        key: "lottery",
        iconUrl: lottery,
        text: i18n.t("common.lottery"),
        fontSize: "small",
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      {
        key: "fishing",
        iconUrl: fishing,
        text: i18n.t("common.fish"),
        fontSize: "small",
        gameType: GameTypeEnum.FISH,
      },
      {
        key: "sports",
        iconUrl: sports,
        text: i18n.t("common.sports"),
        fontSize: "small",
        gameType: GameTypeEnum.SPORTS,
      },
      {
        key: "sabong",
        iconUrl: sabong,
        text: i18n.t("common.cockfight"),
        fontSize: "smaller",
        gameType: GameTypeEnum.COCKFIGHT,
      },
      {
        key: "egame",
        iconUrl: egame,
        text: i18n.t("common.egame"),
        fontSize: "small",
        gameType: GameTypeEnum.TABLEGAME,
      },
      {
        key: "cardGame",
        iconUrl: cardgame,
        text: i18n.t("common.chess"),
        fontSize: "smaller",
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      {
        key: "esports",
        iconUrl: esports,
        text: i18n.t("common.esports"),
        fontSize: "smaller",
        gameType: GameTypeEnum.ESPORTS,
      },
    ];

    const translatedList = gameTypeList.map((item) => ({
      ...item,
      text: i18n.t(item.text),
    }));

    setTranslatedGameTypeList(translatedList);
  }, []);

  return translatedGameTypeList;
};

export default useGameTypeList;