import { GameService } from "@/api-services/services/GameService";
import banner from "@/assets/images/home/mobile/banner_1.png";
import vendorsIcon from "@/assets/images/home/mobile/vendors.png";
import CardPrompt from "@/components/Mobile/components/CardPrompt";
import Category from "@/components/Mobile/components/Category";
import CategoryLobby from "@/components/Mobile/components/CategoryLobby";
import Slider from "@/components/Mobile/components/Slider";
import SocialMedia from "@/components/Mobile/components/SocialMedia";
import Tab from "@/components/Mobile/components/Tab";
import TabPanel from "@/components/Mobile/components/TabPanel";
import config from "@/config/config";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import Common from "@/utils/Common";
import getDisplayGameType from "@/utils/getDisplayGameType";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Tag from "../components/Tag";
import { badgeList } from "../constants/games";
import { gameTypeList, isNotEnterLobby } from "../constants/tab";

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

const NewBadgeIcon = styled.div`
  width: 45.5px;
  height: 21px;
  background-image: url(${(props: Props) => props.imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: absolute;
  top: 25px;
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

const TagContainer = styled.div`
    margin-bottom: 8px;
    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;
    width: 100%;
    -webkit-overflow-scrolling: touch;
`;

const Main = (props: Props) => {
  const history = useHistory();
  const { game } = useGameStore();
  const { general } = useGeneralStore();
  const [activeGameTypeTab, setActiveGameTypeTab] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [isEnterLobby, setIsEnterLobby] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredGameList, setFilteredGameList] = useState<any[]>([]);
  const [groupByProvider, setGroupByProvider] = useState<any>({});

  const handleGameTypeClick = (gameType: number) => {
    setActiveGameTypeTab(gameType);
    if (gameType) {
      setIsEnterLobby(!isNotEnterLobby.includes(gameType));
    }
  };

  const handleTagClick = (gpcode: string) => {
    setSelectedTag(gpcode);
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
      key: item.key,
      gameData: groupBy_gameType[item.gameType] || [],
    }));
  }, [gameTypeList, groupBy_gameType]);

  const tagList = useMemo(
    () => {
      const tags = Object.keys(groupByProvider);
      const filteredTags = tags
        .filter((key) => typeof key === 'string')
        .map((provider) => ({ name: provider }));
      return [
        { name: "All" },
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

  useEffect(() => {
    if (activeGameTypeTab) {
      GameService.GetGameList("", activeGameTypeTab).then((res) => {
        if (res && res.IsSuccess && res.data) {
          const groupByProvider = filterAndGroupGames(res.data);
          setGroupByProvider(groupByProvider);

          switch (selectedTag) {
            case "All":
              return setFilteredGameList(res.data);
            case "Hot":
              return setFilteredGameList(res.data.filter((item: any) => item.tag.hot));
            case "New":
              return setFilteredGameList(res.data.filter((item: any) => item.tag.new));
            case "Recommend":
              return setFilteredGameList(res.data.filter((item: any) => item.tag.recommend));
            case selectedTag:
              return setFilteredGameList(groupByProvider[selectedTag]);
            default:
              return setFilteredGameList(res.data);
          }
        }
      });
    }
  }, [activeGameTypeTab, selectedTag]);

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

      {isEnterLobby &&
        <Category
          gameTypeData={groupBy_gameType[activeGameTypeTab] || []}
          gameTypeName={gameTypeList.find((item) => item.gameType === activeGameTypeTab)?.key || ""}
        />
      }

      {/* Slot / Fishing / Egame */}
      {!isEnterLobby && !!activeGameTypeTab && (
        <>
          <TagContainer>
            {tagList.map(item => (
              <Tag
                key={item.name}
                text={item.name}
                isActive={item.name === selectedTag}
                onClick={() => setSelectedTag(item.name)} />
            ))}
          </TagContainer>

          {/* <Input
            placeholder={"Search"}
            imageUrl={searchIcon}
            handleChange={handleSearch}
            value={searchString}
          /> */}

          <GameCardContainer>
            {filteredGameList.map(
              (item: {
                // isFavorite: any;  //to-do: 把 isFavorite 加回來
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
              }) => (
                <>
                  <GameCard
                    key={item.id}
                    imageUrl={`${config.sourceUrl}${item.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${item.code}.jpg`}
                  >
                    {/* to-do: Favorite功能 */}
                    {/* {item.isFavorite ? (
                      <LikeIcon imageUrl={likeIcon} />
                    ) : (
                      <LikeIcon imageUrl={dislikeIcon} />
                    )} */}

                    {item.tag.hot && item.tag.new && selectedTag === "All" && (
                      <>
                        <BadgeIcon imageUrl={badgeList.hot} />
                        <NewBadgeIcon imageUrl={badgeList.new} />
                      </>
                    )}
                    {item.tag.hot && selectedTag === "Hot" && (
                      <BadgeIcon imageUrl={badgeList.hot} />
                    )}
                    {item.tag.new && selectedTag === "New" && (
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
