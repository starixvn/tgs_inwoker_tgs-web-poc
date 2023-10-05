import cardgame from "@/assets/images/home/mobile/tab/card_game.svg";
import egame from "@/assets/images/home/mobile/tab/egame.svg";
import esports from "@/assets/images/home/mobile/tab/esports.svg";
import fishing from "@/assets/images/home/mobile/tab/fishing.svg";
import live from "@/assets/images/home/mobile/tab/live_casino.svg";
import lobby from "@/assets/images/home/mobile/tab/lobby.svg";
import lottery from "@/assets/images/home/mobile/tab/lottery.svg";
import sabong from "@/assets/images/home/mobile/tab/sabong.svg";
import slot from "@/assets/images/home/mobile/tab/slot.svg";
import sports from "@/assets/images/home/mobile/tab/sports.svg";
import { GameTypeEnum } from "../../../api-services/utils/Enum";

// Note : Horse belongs to SPORTS: 1,

type TabIcon = {
  key: string;
  iconUrl: string;
  text: string;
  fontSize: string;
  gameType: number;
}

export const gameTypeList: TabIcon[] = [
  {
    key: "lobby",
    iconUrl: lobby,
    text: "Lobby",
    fontSize: "small",
    gameType: 0
  },
  {
    key: "slots",
    iconUrl: slot,
    text: "Slots",
    fontSize: "small",
    gameType: GameTypeEnum.SLOT
  },
  {
    key: "live",
    iconUrl: live,
    text: "Live Casino",
    fontSize: "smaller",
    gameType: GameTypeEnum.LIVELOBBY
  },
  {
    key: "lottery",
    iconUrl: lottery,
    text: "Lottery",
    fontSize: "small",
    gameType: GameTypeEnum.LOTTERYLOBBY //14 目前沒資料
  },
  {
    key: "fishing",
    iconUrl: fishing,
    text: "Fishing",
    fontSize: "small",
    gameType: GameTypeEnum.FISH
  },
  {
    key: "sports",
    iconUrl: sports,
    text: "Sports",
    fontSize: "small",
    gameType: GameTypeEnum.SPORTS
  },
  {
    key: "sabong",
    iconUrl: sabong,
    text: "Sabong",
    fontSize: "small",
    gameType: GameTypeEnum.COCKFIGHT
  },
  {
    key: "egame",
    iconUrl: egame,
    text: "Egame",
    fontSize: "small",
    gameType: GameTypeEnum.TABLEGAME
  },
  {
    key: "cardgame",
    iconUrl: cardgame,
    text: "Card Game",
    fontSize: "smaller",
    gameType: GameTypeEnum.QIPAILOBBY
  },
  {
    key: "esports",
    iconUrl: esports,
    text: "Esports",
    fontSize: "smaller",
    gameType: GameTypeEnum.ESPORTS
  }
];

export const rankingTabList: string[] = ['Latest Record', 'Winning Ranking'];