import cardgame from "@/assets/images/home/mobile/tab/card_game.svg";
import egame from "@/assets/images/home/mobile/tab/egame.svg";
import esports from "@/assets/images/home/mobile/tab/esports.svg";
import favorite from "@/assets/images/home/mobile/tab/favorite.svg";
import fishing from "@/assets/images/home/mobile/tab/fishing.svg";
import horse from "@/assets/images/home/mobile/tab/horse.svg";
import live from "@/assets/images/home/mobile/tab/live_casino.svg";
import lobby from "@/assets/images/home/mobile/tab/lobby.svg";
import lottery from "@/assets/images/home/mobile/tab/lottery.svg";
import sabong from "@/assets/images/home/mobile/tab/sabong.svg";
import slot from "@/assets/images/home/mobile/tab/slot.svg";
import sports from "@/assets/images/home/mobile/tab/sports.svg";

type TabIcon = {
    key: string;
    iconUrl: string;
    text: string;
    fontSize: string;
}

export const tabIconList: TabIcon[] = [
    {
        key: "Lobby",
        iconUrl: lobby,
        text: "Lobby",
        fontSize: "small"
    },
    {
        key: "slots",
        iconUrl: slot,
        text: "Slots",
        fontSize: "small"
    },
    {
        key: "Live",
        iconUrl: live,
        text: "Live Casino",
        fontSize: "smaller"
    },
    {
        key: "lottery",
        iconUrl: lottery,
        text: "Lottery",
        fontSize: "small"
    },
    {
        key: "fishing",
        iconUrl: fishing,
        text: "Fishing",
        fontSize: "small"
    },
    {
        key: "sports",
        iconUrl: sports,
        text: "Sports",
        fontSize: "small"
    },
    {
        key: "horse",
        iconUrl: horse,
        text: "Horse",
        fontSize: "small"
    },
    {
        key: "sabong",
        iconUrl: sabong,
        text: "Sabong",
        fontSize: "small"
    },
    {
        key: "egame",
        iconUrl: egame,
        text: "Egame",
        fontSize: "small"
    },
    {
        key: "cardgame",
        iconUrl: cardgame,
        text: "Card Game",
        fontSize: "smaller"
    },
    {
        key: "esports",
        iconUrl: esports,
        text: "Esports",
        fontSize: "smaller"
    },
    {
        key: "Favorite",
        iconUrl: favorite,
        text: "favorite",
        fontSize: "small"
    }
];

export const rankingTabList: string[] = ['Latest Record', 'Winning Ranking'];