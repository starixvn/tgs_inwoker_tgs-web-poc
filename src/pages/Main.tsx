
import vendorsIcon from "@/assets/t18/images/home/mobile/vendors.png";
import CardPrompt from "@/components/CardPrompt";
import Category from "@/components/Category";
import GameTypeTab from "@/components/GameTypeTab";
import Lobby from "@/components/Lobby";
import Slider from "@/components/Slider";
import SocialMedia from "@/components/SocialMedia";
import TabPanel from "@/components/TabPanel";
import TagCategory from "@/components/TagCategory";
import { gameTypeList, isNotEnterLobby } from "@/constants/gameType";
import useGameApi from "@/hooks/home/useGameApi";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { useRwd } from "@/hooks/useRwd";
import { media } from "@/theme/breakpoints";
import React, {
  ChangeEvent,
  useEffect,
  useState
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
  const { general } = useGeneralStore();
  const [activeGameTypeTab, setActiveGameTypeTab] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [isEnterLobby, setIsEnterLobby] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");
  const { isMobileSize } = useRwd();
  const {
    isLoading,
    filteredMatchGames,
    favoriteList,
    fetchFavoriteList,
    tagList,
    groupBy_gameType
  } = useGameApi({
    activeGameTypeTab,
    selectedTag,
    searchString,
    isEnterLobby
  });

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [activeGameTypeTab]);

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
          gameTypeData={groupBy_gameType[activeGameTypeTab]}
          gameTypeName={
            gameTypeList.find((item) => item.gameType === activeGameTypeTab)
              ?.key || ""
          }
          gameType={activeGameTypeTab}
        />
      )}

      {/* Slot / Fishing / Egame */}
      {!isEnterLobby && !!activeGameTypeTab && !isLoading && (
        <TagCategory
          tagList={tagList}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          handleSearch={handleSearch}
          searchString={searchString}
          filteredMatchGames={filteredMatchGames}
          favoriteList={favoriteList}
          fetchFavoriteList={fetchFavoriteList}
        />
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
