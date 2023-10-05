import banner from "@/assets/images/home/mobile/banner_1.png";
import dislikeIcon from "@/assets/images/home/mobile/dislike.png";
import likeIcon from "@/assets/images/home/mobile/like.png";
import searchIcon from "@/assets/images/home/mobile/search.svg";
import vendorsIcon from "@/assets/images/home/mobile/vendors.png";
import CardPrompt from "@/components/Mobile/components/CardPrompt";
import Input from "@/components/Mobile/components/Input";
import Slider from "@/components/Mobile/components/Slider";
import SocialMedia from "@/components/Mobile/components/SocialMedia";
import Tab from "@/components/Mobile/components/Tab";
import TabPanel from "@/components/Mobile/components/TabPanel";
import Tag from "@/components/Mobile/components/Tag";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import getDisplayGameType from "@/utils/getDisplayGameType";
import { ChangeEvent, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import Category from "../components/Category";
import CategoryLobby from "../components/CategoryLobby";
import { badgeList, gamesList } from "../constants/games";
import { gameTypeList } from "../constants/tab";

type Props = {
  imageUrl: string;
};

const MainWrapper = styled.div`
  width: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${(props: { theme: { primaryDark: any } }) =>
    props.theme.primaryDark};
  color: ${(props: { theme: { white: any } }) => props.theme.white};
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

const VendorIcon = styled.div`
  width: 392px;
  height: 296px;
  background-image: url(${vendorsIcon});
  background-size: cover;
`;

const LobbyContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;
`;

const Main = (props: Props) => {
  const history = useHistory();
  const { game, getHomePageGameList } = useGameStore();
  const { general } = useGeneralStore();
  const [activeGameTypeTab, setActiveGameTypeTab] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [isLobby, setIsLobby] = useState(true);

  const handleGameTypeClick = (gameType: number) => {
    setActiveGameTypeTab(gameType);
    if (gameType) {
      setIsLobby(false);
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchString(value);
  };

  // 這裡不包含 LOBBYALL
  const groupBy_gameType = useMemo(() => {
    const providedGameTypes: number[] = getDisplayGameType();
    const providedGameTypesSet = new Set(providedGameTypes);

    if (!game.homePageGameList || game.homePageGameList.length === 0) {
      return {};
    }

    const groups = game.homePageGameList.reduce((accumulator, game) => {
      const { type, ...rest } = game;
      if (!accumulator[type]) {
        accumulator[type] = [];
      }
      accumulator[type].push(rest);
      return accumulator;
    }, {});

    const filteredGroups: { [key: number]: any[] } = {};
    Object.keys(groups).forEach((key) => {
      const gameType = parseInt(key, 10);
      if (providedGameTypesSet.has(gameType)) {
        filteredGroups[gameType] = groups[key];
      }
    });
    return filteredGroups;

  }, [game.homePageGameList]);

  const lobbyAllGroupByData = useMemo(() => {
    if (Object.keys(groupBy_gameType).length === 0) {
      return [];
    }

    return gameTypeList.map((item) => ({
      gameType: item.gameType,
      iconUrl: item.iconUrl,
      text: item.text,
      gameData: groupBy_gameType[item.gameType] || [],
    }));
  }, [gameTypeList, groupBy_gameType]);

  return (
    <MainWrapper>
      {!!general.banner.length && <Slider />}

      <CardPrompt />

      <TabContainer>
        {gameTypeList.map(
          (item: {
            key: string;
            iconUrl: string;
            text: string;
            fontSize: string;
            gameType: number;
          }) => (
            <Tab
              key={item.key}
              imageUrl={item.iconUrl}
              text={item.text}
              isActive={item.gameType === activeGameTypeTab}
              fontSize={item.fontSize}
              type={item.gameType}
              onClick={() => handleGameTypeClick(item.gameType)}
            />
          )
        )}
      </TabContainer>

      {!activeGameTypeTab &&
        <LobbyContainer>
          {lobbyAllGroupByData.slice(1).map((item: any) => (
            <CategoryLobby
              key={item.gameType}
              iconUrl={item.iconUrl}
              text={item.text}
              lobbyAllGameData={item.gameData}
            />
          ))}
        </LobbyContainer>
      }

      {(activeGameTypeTab === GameTypeEnum.LIVELOBBY ||
        activeGameTypeTab === GameTypeEnum.LOTTERYLOBBY ||
        activeGameTypeTab === GameTypeEnum.SPORTS ||
        activeGameTypeTab === GameTypeEnum.COCKFIGHT ||
        activeGameTypeTab === GameTypeEnum.QIPAILOBBY) &&
        <Category
          gameTypeData={groupBy_gameType[activeGameTypeTab] || []}
        />
      }

      {activeGameTypeTab === GameTypeEnum.SLOT ||
        activeGameTypeTab === GameTypeEnum.FISH ||
        activeGameTypeTab === GameTypeEnum.TABLEGAME && (
          <>
            <Tag />
            <Input
              placeholder={"Search"}
              imageUrl={searchIcon}
              handleChange={handleSearch}
              value={searchString}
            />
            <GameCardContainer>
              {gamesList.map(
                (item: {
                  isFavorite: any;
                  key: string;
                  iconUrl: string;
                  tag: string;
                }) => (
                  <>
                    <GameCard key={item.key} imageUrl={item.iconUrl}>
                      {item.isFavorite ? (
                        <LikeIcon imageUrl={likeIcon} />
                      ) : (
                        <LikeIcon imageUrl={dislikeIcon} />
                      )}

                      {item.tag === "hot" && (
                        <BadgeIcon imageUrl={badgeList.hot} />
                      )}
                      {item.tag === "new" && (
                        <BadgeIcon imageUrl={badgeList.new} />
                      )}
                    </GameCard>
                  </>
                )
              )}
            </GameCardContainer>
          </>
        )}

      <TabPanel />
      <SocialMedia />
      <VendorIcon />
    </MainWrapper>
  );
};

export default Main;
