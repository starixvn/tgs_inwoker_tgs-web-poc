import { GameService } from "@/api-services/services/GameService";
import searchIcon from "@/assets/images/home/mobile/search.svg";
import vendorsIcon from "@/assets/images/home/mobile/vendors.png";
import CardPrompt from "@/components/Mobile/components/CardPrompt";
import Category from "@/components/Mobile/components/Category";
import GameCard from "@/components/Mobile/components/GameCard";
import Input from "@/components/Mobile/components/Input";
import Lobby from "@/components/Mobile/components/Lobby";
import Slider from "@/components/Mobile/components/Slider";
import SocialMedia from "@/components/Mobile/components/SocialMedia";
import Tab from "@/components/Mobile/components/Tab";
import TabPanel from "@/components/Mobile/components/TabPanel";
import Tag from "@/components/Mobile/components/Tag";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import getDisplayGameType from "@/utils/getDisplayGameType";
import i18n from "@/utils/i18n";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { gameTypeList, isNotEnterLobby } from "../constants/tab";
import { gameTagList } from "../constants/tag";

type Props = {
  imageUrl: string;
};

type GameItem = {
  key: string;
  code: string;
  description: string;
  gpcode: string;
  id: number;
  isactive: boolean;
  name: string;
  tag: {
    hot: boolean;
    new: boolean;
    recommend: boolean;
  };
  type: number;
  isFavorite: boolean;
}

type groupByGameType = {
  abbreviation: string;
  game_platform_id: number;
  game_platform_name: string;
  is_try: number;
  name: string;
  params: null | string;
  gpcode: string;
  type: number;
  status: number;
}

const MainWrapper = styled.div`
  width: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${props => props.theme.primaryDark};
  color: ${props => props.theme.white};
  margin-bottom: 82px;
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

const VendorIcon = styled.div`
  width: 392px;
  height: 296px;
  background-image: url(${vendorsIcon});
  background-size: cover;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  width: 100%;
  -webkit-overflow-scrolling: touch;
`;

const Main = (props: Props) => {
  const { game, getFavoriteGame } = useGameStore();
  const { general } = useGeneralStore();
  const { account } = useAccountStore();
  const [activeGameTypeTab, setActiveGameTypeTab] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [isEnterLobby, setIsEnterLobby] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredGameList, setFilteredGameList] = useState<any[]>([]);
  const [groupByProvider, setGroupByProvider] = useState<any>({});
  const [favoriteList, setFavoriteList] = useState<number[]>([]);
  const [filteredMatchGames, setFilteredMatchGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGameTypeClick = (gameType: number) => {
    setActiveGameTypeTab(gameType);
    if (gameType) {
      setIsEnterLobby(!isNotEnterLobby.includes(gameType));
    }
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchString(value);
  };

  // groupBy_gameType : 除了Lobby之外的所有gameType
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

  const tagList = useMemo(
    () => {
      const tags = Object.keys(groupByProvider);
      const filteredTags = tags
        .filter((key) => typeof key === 'string')
        .map((provider) => ({ name: provider }));
      return [
        { name: "All" },
        account.token && { name: "Favorite" },
        { name: "Hot" },
        { name: "New" },
        { name: "Recommend" },
        ...filteredTags];
    },
    [groupByProvider]
  );

  const filterAndGroupGames = (gameList: any[]) => {
    const groupByGpcode = gameList.reduce((accumulator, game) => {
      const { gpcode, ...rest } = game;
      if (!accumulator[gpcode]) {
        accumulator[gpcode] = [];
      }
      // Add gpcode to the rest object
      const gameWithGpcode = { ...rest, gpcode };
      accumulator[gpcode].push(gameWithGpcode);
      return accumulator;
    }, {});

    return groupByGpcode;
  };

  const fetchFavoriteList = useCallback(async () => {
    const getFavoriteResDto = await getFavoriteGame(activeGameTypeTab);
    const favoriteList = getFavoriteResDto?.data || []
    setFavoriteList(favoriteList || []);
  }, [activeGameTypeTab]);

  useEffect(() => {
    if (account.token && activeGameTypeTab && !isEnterLobby) fetchFavoriteList();
  }, [account.token, activeGameTypeTab, isEnterLobby]);

  useEffect(() => {
    if (activeGameTypeTab && !isEnterLobby) {
      GameService.GetGameList("", activeGameTypeTab).then((res) => {
        setIsLoading(true);
        if (res && res.data) {
          const groupByProvider = filterAndGroupGames(res.data);
          setGroupByProvider(groupByProvider);

          const filteredGameListWithFavorites = favoriteList.length > 0
            ? res.data.map((item: GameItem) => ({
              ...item,
              isFavorite: favoriteList.includes(item.id),
            }))
            : res.data;

          switch (selectedTag) {
            case "All":
              setIsLoading(false);
              return setFilteredGameList(filteredGameListWithFavorites);
            case "Favorite":
              setIsLoading(false);
              return setFilteredGameList(filteredGameListWithFavorites.filter((item: GameItem) => favoriteList.includes(item.id)));
            case "Hot":
              setIsLoading(false);
              return setFilteredGameList(filteredGameListWithFavorites.filter((item: GameItem) => item.tag.hot));
            case "New":
              setIsLoading(false);
              return setFilteredGameList(filteredGameListWithFavorites.filter((item: GameItem) => item.tag.new));
            case "Recommend":
              setIsLoading(false);
              return setFilteredGameList(filteredGameListWithFavorites.filter((item: GameItem) => item.tag.recommend));
            case selectedTag:
              setIsLoading(false);
              return setFilteredGameList(groupByProvider[selectedTag]);
            default:
              setIsLoading(false);
              return setFilteredGameList(filteredGameListWithFavorites);
          }
        }
      });
    }
  }, [activeGameTypeTab, selectedTag]);

  useEffect(() => {
    const searchLowerCase = searchString.toLowerCase();

    if (!searchString) {
      setFilteredMatchGames(filteredGameList);
    } else {
      const filteredGames = filteredGameList.filter((item) => {
        const gameName = item.name.toLowerCase();
        return gameName.includes(searchLowerCase);
      });

      setFilteredMatchGames(filteredGames);
    }
  }, [searchString, filteredGameList]);

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
        <Lobby
          handleGameTypeClick={handleGameTypeClick}
          groupBy_gameType={groupBy_gameType}
        />
      }

      {isEnterLobby &&
        <Category
          gameTypeData={groupBy_gameType[activeGameTypeTab] || []}
          gameTypeName={gameTypeList.find((item) => item.gameType === activeGameTypeTab)?.key || ""}
          gameType={activeGameTypeTab}
        />
      }

      {/* Slot / Fishing / Egame */}
      {!isEnterLobby && !!activeGameTypeTab && !isLoading && (
        <>
          <TagContainer>
            {tagList.filter((item): item is GameItem => item !== null).map((item: GameItem) => (
              <Tag
                key={item?.name}
                text={item?.name}
                isActive={item?.name === selectedTag && !!item.name}
                isShowIcon={gameTagList.some(tag => tag.text === item.name)}
                onClick={() => setSelectedTag(item.name)} />
            ))}
          </TagContainer>

          <Input
            placeholder={i18n.t("slot.search")}
            imageUrl={searchIcon}
            handleChange={handleSearch}
            value={searchString}
          />

          <GameCardContainer>
            {filteredMatchGames && filteredMatchGames.map(
              (item: GameItem) => (
                <GameCard
                  key={item.id}
                  gameItem={item}
                  selectedTag={selectedTag}
                  favoriteList={favoriteList}
                  fetchFavoriteList={fetchFavoriteList}
                  isFavorite={favoriteList.includes(item.id)}
                  isActive={item.isactive}
                />
              )
            )}
            {!filteredMatchGames.length && <div>No data</div>}
          </GameCardContainer>
        </>
      )}
      {isLoading && <div>Loading...</div>}
      <TabPanel />
      <SocialMedia />
      <VendorIcon />
    </MainWrapper>
  );
};

export default React.memo(Main);
