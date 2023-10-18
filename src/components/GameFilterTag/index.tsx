import { media } from "@/theme/breakpoints";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { gameTagList } from "../../constants/gameTag";
import Tag from "./Tag";

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

type Props = {
  tagList: {}[];
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
  const [isTagDragging, setIsTagDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const tagContainerRef = useRef<HTMLDivElement>(null);

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

  return (
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
  );
};

export default GameFilterTag;
