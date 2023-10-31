import { GameService } from '@/api-services/services/GameService';
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGameStore } from "@/hooks/stores/useGameStore";
import getDisplayGameType from '@/utils/getDisplayGameType';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

type Props = {
  activeGameTypeTab: number;
  selectedTag: string;
  searchString: string;
  isEnterLobby: boolean;
};

const useGameApi = ({
  activeGameTypeTab,
  selectedTag,
  searchString,
  isEnterLobby,
}: Props) => {
  const { game, getFavoriteGame } = useGameStore();
  const { account } = useAccountStore();
  const [filteredGameList, setFilteredGameList] = useState<any[]>([]);
  const [groupByGameProvider, setGroupByGameProvider] = useState<any>({});
  const [favoriteList, setFavoriteList] = useState<number[]>([]);
  const [filteredMatchGames, setFilteredMatchGames] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        const matchedProviderName = groupBy_gameType[activeGameTypeTab].find(targetGame => targetGame.gpcode === provider);
        return matchedProviderName ? { name: matchedProviderName.name } : null;
      });
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
      GameService.GetGameList('', activeGameTypeTab).then((res) => {
        setIsLoading(true);
        if (res && res.data) {
          const groupByGameProvider = filterAndGroupGames(res.data);
          setGroupByGameProvider(groupByGameProvider);

          const filteredGameListWithFavorites =
            favoriteList.length > 0
              ? res.data.map((item: GameItem) => ({
                ...item,
                isFavorite: favoriteList.includes(item.id),
              }))
              : res.data;

          switch (selectedTag) {
            case 'All':
              setIsLoading(false);
              return setFilteredGameList(filteredGameListWithFavorites);
            case 'Favorite':
              setIsLoading(false);
              return setFilteredGameList(
                filteredGameListWithFavorites.filter((item: GameItem) =>
                  favoriteList.includes(item.id)
                )
              );
            case 'Hot':
              setIsLoading(false);
              return setFilteredGameList(
                filteredGameListWithFavorites.filter(
                  (item: GameItem) => item.tag.hot
                )
              );
            case 'New':
              setIsLoading(false);
              return setFilteredGameList(
                filteredGameListWithFavorites.filter(
                  (item: GameItem) => item.tag.new
                )
              );
            case 'Recommend':
              setIsLoading(false);
              return setFilteredGameList(
                filteredGameListWithFavorites.filter(
                  (item: GameItem) => item.tag.recommend
                )
              );
            case selectedTag:
              setIsLoading(false);
              return setFilteredGameList(groupByGameProvider[selectedTag]);
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

  return {
    isLoading,
    filteredMatchGames,
    favoriteList,
    fetchFavoriteList,
    tagList,
    groupBy_gameType
  };
}

export default useGameApi;
