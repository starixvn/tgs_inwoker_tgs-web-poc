import { gameTagList } from "@/constants/gameTag";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";
import Tag from "./Tag";

const TagContainer = styled.div`
  width: 100%;
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

const GameFilterTag = ({ tagList, selectedTag, setSelectedTag }: Props) => {
  return (
    <TagContainer
    >
      {tagList
        .map(gameTagItem => {
          const name = gameTagItem?.name ?? "";

          return (
            <Tag
              key={name}
              text={name}
              isActive={name === selectedTag && !!name}
              isShowIcon={gameTagList.some((tag) => tag.text === name)}
              onClick={() => setSelectedTag(name)}
            />
          );
        })}
    </TagContainer>
  );
};

export default GameFilterTag;
