import { media } from "@/theme/breakpoints";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { gameTypeList } from "@/constants/tab";
import Tab from "./Tab";

type TabContainerProps = {
  $isDragging: boolean;
};
const TabContainer = styled.div<TabContainerProps>`
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
    cursor: ${({ $isDragging }: TabContainerProps) =>
      $isDragging ? "grabbing" : "grab"};
  }
`;

type Props = {
  activeGameTypeTab: number;
  handleGameTypeClick: (gameType: number) => void;
};

const GameTypeTab = ({ activeGameTypeTab, handleGameTypeClick }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // 說明:滑鼠單次點擊切換Tab ; 滑鼠長按不放可拖曳
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (tabContainerRef.current?.scrollLeft ?? 0));
    if (tabContainerRef.current) {
      tabContainerRef.current.style.cursor = "grabbing"; // 手指按下時,滑鼠游標變成手指
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
      tabContainerRef.current.style.cursor = "grab";
      tabContainerRef.current.style.scrollBehavior = "smooth";
      tabContainerRef.current.scrollLeft += 50;
      // number: 滾動條滾動距離,可控制反彈距離
      tabContainerRef.current.style.scrollBehavior = "auto";
    }
  };

  return (
    <TabContainer
      ref={tabContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      $isDragging={isDragging} // Add isDragging prop here
    >
      {gameTypeList.map((gameTypeItem) => {
        const { key, iconUrl, text, gameType, fontSize } = gameTypeItem;

        return (
          <Tab
            key={key}
            imageUrl={iconUrl}
            text={text}
            isActive={gameType === activeGameTypeTab}
            fontSize={fontSize}
            onClick={() => handleGameTypeClick(gameType)}
            isDraggable={isDragging}
          />
        );
      })}
    </TabContainer>
  );
};

export default GameTypeTab;
