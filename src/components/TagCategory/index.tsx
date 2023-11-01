import searchIcon from "@/assets/t18/images/home/mobile/search.svg";
import GameFilterTag from "@/components/GameFilterTag";
import Input from "@/components/Input";
import { useRwd } from "@/hooks/useRwd";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import GameCard from "../GameCard";

const GameCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 16px;
  width: 100%;
  margin: 15px 0;
`;

type Tag = { name: string };

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

const TagCategory = ({ tagList, selectedTag, setSelectedTag, handleSearch, searchString, filteredMatchGames, favoriteList, fetchFavoriteList }: Props) => {
  const { isMobileSize } = useRwd();

  return (
    <>
      <GameFilterTag
        tagList={tagList.filter((tag: number) => tag !== null)}
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
        {filteredMatchGames.length &&
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
  );
};

export default TagCategory;
