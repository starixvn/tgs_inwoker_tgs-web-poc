import { media } from "@/theme/breakpoints";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { gameTagList } from "../../constants/gameTag";
import Tag from "./Tag";
import { useDomDragging } from "@/hooks/main/useDomDragging";

type TagContainerProps = {
  $isDragging: boolean;
};

const TagContainer = styled.div<TagContainerProps>`
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
    cursor: ${({ $isDragging }: TagContainerProps) =>
      $isDragging ? "grabbing" : "grab"};
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
  const {
    isDragging,
    domRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDomDragging();

  return (
    <TagContainer
      ref={domRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      $isDragging={isDragging}
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
