import { media } from "@/theme/breakpoints";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { gameTypeList } from "@/constants/tab";
import Tab from "./Tab";
import { useDomDragging } from "@/hooks/main/useDomDragging";

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
  const {
    isDragging,
    domRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useDomDragging();

  return (
    <TabContainer
      ref={domRef}
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
