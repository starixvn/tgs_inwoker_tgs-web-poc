import banner from "@/assets/images/home/mobile/banner_1.png";
import dislikeIcon from "@/assets/images/home/mobile/dislike.png";
import likeIcon from "@/assets/images/home/mobile/like.png";
import searchIcon from "@/assets/images/home/mobile/search.svg";
import CardPrompt from "@/components/Mobile/components/CardPrompt";
import Category from "@/components/Mobile/components/Category";
import Input from "@/components/Mobile/components/Input";
import Tab from "@/components/Mobile/components/Tab";
import Tag from "@/components/Mobile/components/Tag";
import { ChangeEvent, useState } from 'react';
import styled from "styled-components";
import { badgeList, gamesList } from "../constants/games";
import { tabIconList } from "../constants/tab";

type Props = {
    imageUrl: string;
};

const MainWrapper = styled.div`
    width: 100%;
    padding: 22px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${(props: { theme: { primaryDark: any; }; }) => props.theme.primaryDark};
    color: ${(props: { theme: { white: any; }; }) => props.theme.white};
    margin-bottom: 82px;
`;

const Banner = styled.div`
    width: 100%;
    padding-top: 62.5%;
    margin-bottom: 15px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${banner});
    border-radius: 12px;
`;

const TabContainer = styled.div`
    margin-bottom: 15px;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    /* Enable smooth scrolling on iOS */
`;

const GameCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 16px;
    width: 100%;
    margin: 15px 0;
`;

const GameCard = styled.div`
    width: calc(50% - 8px);
    padding-top: calc(50% - 8px);
    background-image: url(${(props: Props) => props.imageUrl});
    background-size: cover;
    box-sizing: border-box;
    position: relative;
`;

const LikeIcon = styled.div`
    width: 30px;
    height: 30px;
    background-image: url(${(props: Props) => props.imageUrl});
    background-size: cover;
    box-sizing: border-box;
    position: absolute;
    top: 6px;
    right: 8px;
`;

const BadgeIcon = styled.div`
    width: 45.5px;
    height: 21px;
    background-image: url(${(props: Props) => props.imageUrl});
    background-size: cover;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
`;

const Main = (props: Props) => {
    const [selectedTab, setSelectedTab] = useState("Lobby");
    const [searchString, setSearchString] = useState("");

    const handleClick = (item: string) => {
        setSelectedTab(item);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchString(value);
    };

    return <MainWrapper>
        <Banner></Banner>
        <CardPrompt />

        <TabContainer>
            {tabIconList.map((item: { key: string; iconUrl: string; text: string; fontSize: string; }) => (
                <Tab
                    key={item.key}
                    imageUrl={item.iconUrl}
                    text={item.text}
                    isActive={item.text === selectedTab}
                    fontSize={item.fontSize}
                    onClick={() => handleClick(item.text)}
                />
            ))}
        </TabContainer>

        {(selectedTab === "Slots" || selectedTab === "Fishing" || selectedTab === "Egame") ?
            <>
                <Tag />
                <Input placeholder={"Search"} imageUrl={searchIcon} handleChange={handleSearch} value={searchString} />
                <GameCardContainer>
                    {gamesList.map((item: {
                        isFavorite: any; key: string; iconUrl: string; tag: string;
                    }) => (
                        <>
                            <GameCard
                                key={item.key}
                                imageUrl={item.iconUrl}
                            >
                                {item.isFavorite ? <LikeIcon
                                    imageUrl={likeIcon}
                                /> : <LikeIcon
                                    imageUrl={dislikeIcon}
                                />}

                                {item.tag === "hot" && <BadgeIcon imageUrl={badgeList.hot} />}
                                {item.tag === "new" && <BadgeIcon imageUrl={badgeList.new} />}
                            </GameCard>
                        </>
                    ))}
                </GameCardContainer>
            </>
            : <Category />
        }
    </MainWrapper>
};

export default Main;
