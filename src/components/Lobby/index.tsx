import { GameTypeEnum } from "@/api-services/utils/Enum";
import LobbyCategory from "@/components/LobbyCategory";
import LobbyTagCategory from "@/components/LobbyTagCategory";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import useLobbyCategoryList from "@/hooks/home/useLobbyCategoryList";
import { useRwd } from "@/hooks/useRwd";
import styled from "styled-components";
import { GroupByGameItem } from "../LobbyTagCategory";

const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`;

type Props = {
  handleGameTypeClick: (gameType: number) => void;
  groupBy_gameType: { [key in number]: GroupByGameItem };
};

const Lobby = ({ handleGameTypeClick, groupBy_gameType }: Props) => {
  const { isMobileSize, isDesktopSize } = useRwd();
  const gameTypeList = useGameTypeList();
  const lobbyCategoryList = useLobbyCategoryList();

  const showCategoryAmount = (tag: string, isLobbyType: boolean) => {
    if (isMobileSize) {
      if (isLobbyType) {
        return 3;
      } else {
        if (tag === "Hot") {
          return 9;
        }
      } return 6;
    }
    if (isDesktopSize) {
      return 6;
    }
  }

  return (
    <LobbyContainer>
      {Object.values(lobbyCategoryList).map((category) => {
        const { key, iconUrl, text, gameType } = category;

        if (
          [
            GameTypeEnum.SLOT,
            GameTypeEnum.FISH,
            GameTypeEnum.TABLEGAME,
          ].includes(gameType)
        ) {
          //  slots, fishing, and egame (with games)
          return (
            <LobbyTagCategory
              key={key}
              iconUrl={iconUrl}
              text={text}
              gameType={gameType}
              gameTag={text}
              showDataLength={showCategoryAmount(text, false)!}
              handleViewAllClick={() => {
                handleGameTypeClick(gameType);
              }}
              gameTypeName={
                gameTypeList.find((gameTypeItem) => gameTypeItem.gameType === gameType)
                  ?.key || ""
              }
              groupBy_gameType={Object.values(groupBy_gameType)}
            />
          );
        } else {
          //  others
          return (
            <LobbyCategory
              key={key}
              iconUrl={iconUrl}
              text={text}
              gameType={gameType}
              showDataLength={showCategoryAmount(text, true)!}
              handleViewAllClick={() => {
                handleGameTypeClick(gameType);
              }}
              gameTypeName={
                gameTypeList.find((gameTypeItem) => gameTypeItem.gameType === gameType)
                  ?.key || ""
              }
            />
          );
        }
      })}
    </LobbyContainer>
  );
};

export default Lobby;
