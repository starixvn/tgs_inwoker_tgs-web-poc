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
import { useState } from "react";
import styled from 'styled-components';
import Tab from "./tab";

const tabIconList = [
    {
        key: "Lobby",
        iconUrl: lobby,
        text: "Lobby",
        fontSize: "small" as const
    },
    {
        key: "slots",
        iconUrl: slot,
        text: "Slots",
        fontSize: "small" as const
    },
    {
        key: "Live",
        iconUrl: live,
        text: "Live Casino",
        fontSize: "smaller" as const
    },
    {
        key: "lottery",
        iconUrl: lottery,
        text: "Lottery",
        fontSize: "small" as const
    },
    {
        key: "fishing",
        iconUrl: fishing,
        text: "Fishing",
        fontSize: "small" as const
    },
    {
        key: "sports",
        iconUrl: sports,
        text: "Sports",
        fontSize: "small" as const
    },
    {
        key: "horse",
        iconUrl: horse,
        text: "Horse",
        fontSize: "small" as const
    },
    {
        key: "sabong",
        iconUrl: sabong,
        text: "Sabong",
        fontSize: "small" as const
    },
    {
        key: "egame",
        iconUrl: egame,
        text: "Egame",
        fontSize: "small" as const
    },
    {
        key: "cardgame",
        iconUrl: cardgame,
        text: "Card Game",
        fontSize: "smaller" as const
    },
    {
        key: "esports",
        iconUrl: esports,
        text: "Esports",
        fontSize: "smaller" as const
    },
    {
        key: "Favorite",
        iconUrl: favorite,
        text: "favorite",
        fontSize: "small" as const
    }
]

const Container = styled.div`
    margin-bottom: 15px;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    /* Enable smooth scrolling on iOS */
`;

const TabContainer = () => {
    const [selectedTab, setSelectedTab] = useState("Lobby");
    const handleClick = (item: string) => {
        setSelectedTab(item);
    };

    return (
        <Container>
            {tabIconList.map(item => (
                <Tab
                    key={item.key}
                    imageUrl={item.iconUrl}
                    text={item.text}
                    isActive={item.text === selectedTab}
                    fontSize={item.fontSize}
                    onClick={() => handleClick(item.text)}
                />
            ))}
        </Container>
    );
};

export default TabContainer;
