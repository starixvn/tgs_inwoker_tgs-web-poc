import { GameTypeEnum } from "@/api-services/utils/Enum";
import hot from "@/assets/t18/images/home/mobile/hot.svg";
import newIcon from "@/assets/t18/images/home/mobile/new.svg";
import recommend from "@/assets/t18/images/home/mobile/recommend.svg";
import cardgame from "@/assets/t18/images/home/mobile/tab/card_game.svg";
import egame from "@/assets/t18/images/home/mobile/tab/egame.svg";
import esports from "@/assets/t18/images/home/mobile/tab/esports.svg";
import fishing from "@/assets/t18/images/home/mobile/tab/fishing.svg";
import live from "@/assets/t18/images/home/mobile/tab/live_casino.svg";
import lottery from "@/assets/t18/images/home/mobile/tab/lottery.svg";
import sabong from "@/assets/t18/images/home/mobile/tab/sabong.svg";
import sports from "@/assets/t18/images/home/mobile/tab/sports.svg";
import i18n from "@/utils/i18n";
import { useEffect, useState } from "react";

type LobbyCategoryIcon = {
  key: string;
  iconUrl: string;
  text: string;
  gameType: number;
};

export const useLobbyCategoryList = () => {
  const [translatedLobbyCategoryList, setTranslatedLobbyCategoryList] = useState([]);

  useEffect(() => {

    const lobbyCategoryList: { [key: string]: LobbyCategoryIcon } = {
      slotsHot: {
        key: "slotsHot",
        iconUrl: hot,
        text: i18n.t("slot.hotGame"),
        gameType: GameTypeEnum.SLOT,
      },
      slotsNew: {
        key: "slotsNew",
        iconUrl: newIcon,
        text: i18n.t("slot.newGame"),
        gameType: GameTypeEnum.SLOT,
      },
      slotsRecommend: {
        key: "slotsRecommend",
        iconUrl: recommend,
        text: i18n.t("slot.recommendGame"),
        gameType: GameTypeEnum.SLOT,
      },
      liveCasino: {
        key: "liveCasino",
        iconUrl: live,
        text: i18n.t("common.live"),
        gameType: GameTypeEnum.LIVELOBBY,
      },
      lottery: {
        key: "lottery",
        iconUrl: lottery,
        text: i18n.t("common.lottery"),
        gameType: GameTypeEnum.LOTTERYLOBBY,
      },
      fishing: {
        key: "fishing",
        iconUrl: fishing,
        text: i18n.t("common.fish"),
        gameType: GameTypeEnum.FISH,
      },
      sports: {
        key: "sports",
        iconUrl: sports,
        text: i18n.t("common.sports"),
        gameType: GameTypeEnum.SPORTS,
      },
      sabong: {
        key: "sabong",
        iconUrl: sabong,
        text: i18n.t("common.cockfight"),
        gameType: GameTypeEnum.COCKFIGHT,
      },
      egame: {
        key: "egame",
        iconUrl: egame,
        text: i18n.t("common.egame"),
        gameType: GameTypeEnum.TABLEGAME,
      },
      cardGame: {
        key: "cardGame",
        iconUrl: cardgame,
        text: i18n.t("common.chess"),
        gameType: GameTypeEnum.QIPAILOBBY,
      },
      esports: {
        key: "esports",
        iconUrl: esports,
        text: i18n.t("common.esports"),
        gameType: GameTypeEnum.ESPORTS,
      },
    };
    const translatedList = Object.values(lobbyCategoryList).map((item) => ({
      ...item,
      text: i18n.t(item.text),
    }));

    setTranslatedLobbyCategoryList(translatedList);
  }, []);

  return translatedLobbyCategoryList;
};

export default useLobbyCategoryList;