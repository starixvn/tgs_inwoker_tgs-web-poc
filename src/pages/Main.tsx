import { GameService } from "@/api-services/services/GameService";
import searchIcon from "@/assets/images/home/mobile/search.svg";
import vendorsIcon from "@/assets/images/home/mobile/vendors.png";
import CardPrompt from "@/components/CardPrompt";
import Category from "@/components/Category";
import GameCard from "@/components/GameCard";
import Input from "@/components/Input";
import Lobby from "@/components/Lobby";
import Slider from "@/components/Slider";
import SocialMedia from "@/components/SocialMedia";
import Tab from "@/components/Tab";
import TabPanel from "@/components/TabPanel";
import Tag from "@/components/Tag";
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
  useRef,
  useState
} from "react";
import styled from "styled-components";
import { gameTagList } from "../constants/gameTag";
import { gameTypeList, isNotEnterLobby } from "../constants/tab";

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
  margin-bottom: 82px;

  ${media.sm} {
    max-width: 870px;
    margin: 0 auto;
  }
`;
const TabSearchContainer = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  
  ${media.sm} {
    height: 40px;
    background: ${(props) => props.theme.primaryLight};
    margin-bottom: 20px;
  }
`;

const TabContainer = styled.div`
  margin-bottom: 15px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  /* Enable smooth scrolling on iOS */

  ${media.sm} {
    overflow-x: hidden;
    width: calc(100% - 189px);
    margin-bottom: unset;
    transition: scroll-left 0.2s ease-in-out; 
  }
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
  -webkit-overflow-scrolling: touch;

  ${media.sm} {
    overflow-x: hidden;
    transition: scroll-left 0.2s ease-in-out; 
  }
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
  const [isDragging, setIsDragging] = useState(false);
  const [isTagDragging, setIsTagDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const tagContainerRef = useRef<HTMLDivElement>(null);
  const { isDesktopSize, isMobileSize } = useRwd();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (tabContainerRef.current?.scrollLeft ?? 0));
    if (tabContainerRef.current) {
      tabContainerRef.current.style.cursor = 'grabbing'; // 手指按下時,滑鼠游標變成手指
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (!tabContainerRef.current) return;
    const x = e.pageX - tabContainerRef.current.getBoundingClientRect().left;
    const distance = (x - startX) * 3;
    //  number: 滑鼠移動位移與滾動條滾動關係,數值越大越快
    tabContainerRef.current.scrollLeft = startX + distance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (tabContainerRef.current) {
      tabContainerRef.current.style.cursor = 'grab';
      tabContainerRef.current.style.scrollBehavior = 'smooth';
      tabContainerRef.current.scrollLeft += 50;
      // number: 滾動條滾動距離,可控制反彈距離
      tabContainerRef.current.style.scrollBehavior = 'auto';
    }
  };

  // for tags

  const handleTagMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsTagDragging(true);
    setStartX(e.pageX - (tagContainerRef.current?.scrollLeft ?? 0));
    if (tagContainerRef.current) {
      tagContainerRef.current.style.cursor = 'grabbing'; // 手指按下時,滑鼠游標變成手指
    }
  };

  const handleTagMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTagDragging) return;
    if (!tagContainerRef.current) return;
    const x = e.pageX - tagContainerRef.current.getBoundingClientRect().left;
    const distance = (x - startX) * 3;
    //  number: 滑鼠移動位移與滾動條滾動關係,數值越大越快
    tagContainerRef.current.scrollLeft = startX + distance;
  };

  const handleTagMouseUp = () => {
    setIsTagDragging(false);
    if (tagContainerRef.current) {
      tagContainerRef.current.style.cursor = 'grab';
      tagContainerRef.current.style.scrollBehavior = 'smooth';
      tagContainerRef.current.scrollLeft += 50;
      // number: 滾動條滾動距離,可控制反彈距離
      tagContainerRef.current.style.scrollBehavior = 'auto';
    }
  };

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

  const tagList = useMemo(() => {
    const tags = Object.keys(groupByProvider);
    const filteredTags = tags
      .filter((key) => typeof key === "string")
      .map((provider) => ({ name: provider }));
    return [
      { name: "All" },
      account.token && { name: "Favorite" },
      { name: "Hot" },
      { name: "New" },
      { name: "Recommend" },
      ...filteredTags,
    ];
  }, [groupByProvider]);

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
          const groupByProvider = filterAndGroupGames(res.data);
          setGroupByProvider(groupByProvider);

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

      <TabSearchContainer>
        <TabContainer
          ref={tabContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
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
                onClick={() => handleGameTypeClick(item.gameType)}
              />
            )
          )}
        </TabContainer>
        {isDesktopSize && <InputContainer>
          <Input
            placeholder={i18n.t("slot.search")}
            imageUrl={searchIcon}
            handleChange={handleSearch}
            value={searchString}
          />
        </InputContainer>}
      </TabSearchContainer>

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
          <TagContainer
            ref={tagContainerRef}
            onMouseDown={handleTagMouseDown}
            onMouseMove={handleTagMouseMove}
            onMouseUp={handleTagMouseUp}
          >
            {tagList
              .filter((item): item is GameItem => item !== null)
              .map((item: GameItem) => (
                <Tag
                  key={item?.name}
                  text={item?.name}
                  isActive={item?.name === selectedTag && !!item.name}
                  isShowIcon={gameTagList.some((tag) => tag.text === item.name)}
                  onClick={() => setSelectedTag(item.name)}
                />
              ))}
          </TagContainer>

          {isMobileSize &&
            <Input
              placeholder={i18n.t("slot.search")}
              imageUrl={searchIcon}
              handleChange={handleSearch}
              value={searchString}
            />
          }

          <GameCardContainer>
            {filteredMatchGames &&
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
