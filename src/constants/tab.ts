import hot from "@/assets/t18/images/home/mobile/hot.svg";
import newIcon from "@/assets/t18/images/home/mobile/new.svg";
import recommend from "@/assets/t18/images/home/mobile/recommend.svg";
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
import { GameTypeEnum } from "../api-services/utils/Enum";
// Note : Horse belongs to SPORTS: 1,

type TabIcon = {
  key: string;
  iconUrl: string;
  text: string;
  fontSize: string;
  gameType: number;
};

type LobbyCategoryIcon = {
  key: string;
  iconUrl: string;
  text: string;
  gameType: number;
};

export const gameTypeList: TabIcon[] = [
  {
    key: "lobby",
    iconUrl: lobby,
    text: "Lobby",
    fontSize: "small",
    gameType: 0,
  },
  {
    key: "slots",
    iconUrl: slot,
    text: "Slots",
    fontSize: "small",
    gameType: GameTypeEnum.SLOT,
  },
  {
    key: "liveCasino",
    iconUrl: live,
    text: "Live Casino",
    fontSize: "smaller",
    gameType: GameTypeEnum.LIVELOBBY,
  },
  {
    key: "lottery",
    iconUrl: lottery,
    text: "Lottery",
    fontSize: "small",
    gameType: GameTypeEnum.LOTTERYLOBBY,
  },
  {
    key: "fishing",
    iconUrl: fishing,
    text: "Fishing",
    fontSize: "small",
    gameType: GameTypeEnum.FISH,
  },
  {
    key: "sports",
    iconUrl: sports,
    text: "Sports",
    fontSize: "small",
    gameType: GameTypeEnum.SPORTS,
  },
  {
    key: "sabong",
    iconUrl: sabong,
    text: "Sabong",
    fontSize: "small",
    gameType: GameTypeEnum.COCKFIGHT,
  },
  {
    key: "egame",
    iconUrl: egame,
    text: "Egame",
    fontSize: "small",
    gameType: GameTypeEnum.TABLEGAME,
  },
  {
    key: "cardGame",
    iconUrl: cardgame,
    text: "Card Game",
    fontSize: "smaller",
    gameType: GameTypeEnum.QIPAILOBBY,
  },
  {
    key: "esports",
    iconUrl: esports,
    text: "Esports",
    fontSize: "smaller",
    gameType: GameTypeEnum.ESPORTS,
  },
];

export const lobbyCategoryList: { [key: string]: LobbyCategoryIcon } = {
  slotsHot: {
    key: "slotsHot",
    iconUrl: hot,
    text: "Hot",
    gameType: GameTypeEnum.SLOT,
  },
  slotsNew: {
    key: "slotsNew",
    iconUrl: newIcon,
    text: "New",
    gameType: GameTypeEnum.SLOT,
  },
  slotsRecommend: {
    key: "slotsRecommend",
    iconUrl: recommend,
    text: "Recommend",
    gameType: GameTypeEnum.SLOT,
  },
  liveCasino: {
    key: "liveCasino",
    iconUrl: live,
    text: "Live Casino",
    gameType: GameTypeEnum.LIVELOBBY,
  },
  lottery: {
    key: "lottery",
    iconUrl: lottery,
    text: "Lottery",
    gameType: GameTypeEnum.LOTTERYLOBBY,
  },
  fishing: {
    key: "fishing",
    iconUrl: fishing,
    text: "Fishing",
    gameType: GameTypeEnum.FISH,
  },
  sports: {
    key: "sports",
    iconUrl: sports,
    text: "Sports",
    gameType: GameTypeEnum.SPORTS,
  },
  sabong: {
    key: "sabong",
    iconUrl: sabong,
    text: "Sabong",
    gameType: GameTypeEnum.COCKFIGHT,
  },
  egame: {
    key: "egame",
    iconUrl: egame,
    text: "Egame",
    gameType: GameTypeEnum.TABLEGAME,
  },
  cardGame: {
    key: "cardGame",
    iconUrl: cardgame,
    text: "Card Game",
    gameType: GameTypeEnum.QIPAILOBBY,
  },
  esports: {
    key: "esports",
    iconUrl: esports,
    text: "Esports",
    gameType: GameTypeEnum.ESPORTS,
  },
};

export const isNotEnterLobby: number[] = [
  GameTypeEnum.SLOT,
  GameTypeEnum.FISH,
  GameTypeEnum.TABLEGAME,
];

export const rankingTabList: string[] = ["Latest Record", "Winning Ranking"];
