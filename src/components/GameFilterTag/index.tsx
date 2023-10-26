import { media } from "@/theme/breakpoints";
import styled from "styled-components";
import { gameTagList } from "../../constants/gameTag";
import Tag from "./Tag";

const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  ${media.sm} {
    margin-top: 20px;
    padding-bottom: 5px;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
      background: ${(props) => props.theme.tertiaryDark};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #53535375;
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
  }
`;

type Tag = { name: string };

type Props = {
  tagList: (Tag | null)[];
  selectedTag: string;
  setSelectedTag: (selectedTag: string) => void;
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

const GameFilterTag = ({ tagList, selectedTag, setSelectedTag }: Props) => {
  return (
    <TagContainer
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
  );
};

export default GameFilterTag;
