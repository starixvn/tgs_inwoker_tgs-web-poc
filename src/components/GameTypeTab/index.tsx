import useGameTypeList from "@/hooks/home/useGameTypeList";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";
import Tab from "./Tab";

const TabContainer = styled.div`
  margin-bottom: 15px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  /* Enable smooth scrolling on iOS */

  ${media.sm} {
    margin-bottom: unset;
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

type Props = {
  activeGameTypeTab: number;
  handleGameTypeClick: (gameType: number) => void;
};

const GameTypeTab = ({ activeGameTypeTab, handleGameTypeClick }: Props) => {
  const gameTypeList = useGameTypeList();

  return (
    <TabContainer
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
          />
        );
      })}
    </TabContainer>
  );
};

export default GameTypeTab;
