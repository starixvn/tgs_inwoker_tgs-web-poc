import { GameService } from "@/api-services/services/GameService";
import searchIcon from "@/assets/t18/images/home/mobile/search.svg";
import vendorsIcon from "@/assets/t18/images/home/mobile/vendors.png";
import CardPrompt from "@/components/CardPrompt";
import Category from "@/components/Category";
import GameCard from "@/components/GameCard";
import GameFilterTag from "@/components/GameFilterTag";
import GameTypeTab from "@/components/GameTypeTab";
import Input from "@/components/Input";
import Lobby from "@/components/Lobby";
import Slider from "@/components/Slider";
import SocialMedia from "@/components/SocialMedia";
import TabPanel from "@/components/TabPanel";
import { gameTypeList, isNotEnterLobby } from "@/constants/gameType";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useRwd } from "@/hooks/useRwd";
import { media } from "@/theme/breakpoints";
import getDisplayGameType from "@/utils/getDisplayGameType";
import i18n from "@/utils/i18n";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";

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
};

type Tag = { name: string };
interface Theme {
  primaryDark: string;
  white: string;
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
};

const MainWrapper = styled.div<{ theme: Theme }>`
  width: 100%;
  padding: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({ theme }: { theme: Theme }) => theme.primaryDark};
  color: ${({ theme }: { theme: Theme }) => theme.white};
  gap: 15px;
  
  ${media.sm} {
    max-width: 870px;
    margin: 0 auto;
    padding: 20px;
  }
`;

const TabSearchContainer = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
`;

const InputContainer = styled.div`
  ${media.sm} {
    width: 189px;
    height: 32px;
  }
`;

const GameCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px;
  width: 100%;
  margin: 15px 0;
`;

const VendorIconContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VendorIcon = styled.div`
  width: 392px;
  height: 296px;
  background-image: url(${vendorsIcon});
  background-size: cover;
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
  const [groupByGameProvider, setGroupByGameProvider] = useState<any>({});
  const [favoriteList, setFavoriteList] = useState<number[]>([]);
  const [filteredMatchGames, setFilteredMatchGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isMobileSize } = useRwd();

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

  const tagList: (Tag | null)[] = useMemo(() => {

    const gpCodeBy_gameProvider = Object.keys(groupByGameProvider);

    const filteredTags = gpCodeBy_gameProvider
      .filter((key) => typeof key === "string")
      .map((provider) => {
        const matchedProviderName = groupBy_gameType[activeGameTypeTab].find(targetGames => targetGames.gpcode === provider);
        return matchedProviderName ? { name: matchedProviderName.name } : null;
      });
    // provider:為provider的gpcode，需找對應的provider name

    const additionalTags = [
      { name: "All" },
      account.token ? { name: "Favorite" } : null,
      { name: "Hot" },
      { name: "New" },
      { name: "Recommend" },
      ...filteredTags,
    ];
    return additionalTags.filter((tag) => tag !== null);
  }, [groupByGameProvider, account.token]);

  const filterAndGroupGames = (gameList: any[]) => {
    const groupBy_gpCode = gameList?.reduce((accumulator, game) => {
      const { gpcode, ...rest } = game;
      if (!accumulator[gpcode]) {
        accumulator[gpcode] = [];
      }
      // Add gpcode to the rest object
      const gameWithGpcode = { ...rest, gpcode };
      accumulator[gpcode].push(gameWithGpcode);
      return accumulator;
    }, {});

    return groupBy_gpCode;
  };

  const fetchFavoriteList = useCallback(async () => {
    const getFavoriteResDto = await getFavoriteGame(activeGameTypeTab);
    const favoriteList = getFavoriteResDto?.data || [];
    setFavoriteList(favoriteList || []);
  }, [activeGameTypeTab]);

  useEffect(() => {
    if (account.token && activeGameTypeTab && !isEnterLobby)
      fetchFavoriteList();
  }, [account.token, activeGameTypeTab, isEnterLobby]);

  useEffect(() => {
    if (activeGameTypeTab && !isEnterLobby) {
      GameService.GetGameList("", activeGameTypeTab).then((res) => {
        setIsLoading(true);
        if (res && res.data) {
          // groupBy_gameProvider: key為GPcode, value為該GPcode的遊戲
          const groupBy_gameProvider = filterAndGroupGames(res.data);
          setGroupByGameProvider(groupBy_gameProvider);

          const filteredGameListWithFavorites =
            favoriteList.length > 0
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
              return setFilteredGameList(
                filteredGameListWithFavorites.filter((item: GameItem) =>
                  favoriteList.includes(item.id)
                )
              );
            case "Hot":
              setIsLoading(false);
              return setFilteredGameList(
                filteredGameListWithFavorites.filter(
                  (item: GameItem) => item.tag.hot
                )
              );
            case "New":
              setIsLoading(false);
              return setFilteredGameList(
                filteredGameListWithFavorites.filter(
                  (item: GameItem) => item.tag.new
                )
              );
            case "Recommend":
              setIsLoading(false);
              return setFilteredGameList(
                filteredGameListWithFavorites.filter(
                  (item: GameItem) => item.tag.recommend
                )
              );
            case selectedTag:
              setIsLoading(false);
              return setFilteredGameList(groupBy_gameProvider[selectedTag]);
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [activeGameTypeTab]);

  const hasFilteredMatchGames = !!filteredMatchGames.length
  return (
    <MainWrapper>
      {!!general.banner.length && <Slider />}

      <CardPrompt />

      <GameTypeTab
        activeGameTypeTab={activeGameTypeTab}
        handleGameTypeClick={handleGameTypeClick}
      />

      {!activeGameTypeTab && (
        <Lobby
          handleGameTypeClick={handleGameTypeClick}
          groupBy_gameType={groupBy_gameType}
        />
      )}

      {isEnterLobby && (
        <Category
          gameTypeData={groupBy_gameType[activeGameTypeTab] || []}
          gameTypeName={
            gameTypeList.find((item) => item.gameType === activeGameTypeTab)
              ?.key || ""
          }
          gameType={activeGameTypeTab}
        />
      )}

      {/* Slot / Fishing / Egame */}
      {!isEnterLobby && !!activeGameTypeTab && !isLoading && (
        <>
          <GameFilterTag
            tagList={tagList.filter((tag) => tag !== null) || []}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
          />

          {isMobileSize && (
            <Input
              placeholder={i18n.t("slot.search")}
              imageUrl={searchIcon}
              handleChange={handleSearch}
              value={searchString}
            />
          )}

          <GameCardContainer>
            {hasFilteredMatchGames &&
              filteredMatchGames.map((item: GameItem) => (
                <GameCard
                  key={item.id}
                  gameItem={item}
                  selectedTag={selectedTag}
                  favoriteList={favoriteList}
                  fetchFavoriteList={fetchFavoriteList}
                  isFavorite={favoriteList.includes(item.id)}
                  isActive={item.isactive}
                />
              ))}
            {!hasFilteredMatchGames && <div>No data</div>}
          </GameCardContainer>
        </>
      )}
      {isLoading && <div>Loading...</div>}
      <TabPanel />
      {isMobileSize && <SocialMedia />}
      {isMobileSize && (
        <VendorIconContainer>
          <VendorIcon />
        </VendorIconContainer>
      )}
    </MainWrapper>
  );
};

export default React.memo(Main);
