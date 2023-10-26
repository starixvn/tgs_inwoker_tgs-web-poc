import { GameTypeEnum } from "@/api-services/utils/Enum";
import LobbyCategory from "@/components/LobbyCategory";
import LobbyTagCategory from "@/components/LobbyTagCategory";
import { gameTypeList, lobbyCategoryList } from "@/constants/gameType";
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
        if (
          [
            GameTypeEnum.SLOT,
            GameTypeEnum.FISH,
            GameTypeEnum.TABLEGAME,
          ].includes(category.gameType)
        ) {
          //  slots, fishing, and egame (with games)
          return (
            <LobbyTagCategory
              key={category.key}
              iconUrl={category.iconUrl}
              text={category.text}
              gameType={category.gameType}
              gameTag={category.text}
              showDataLength={showCategoryAmount(category.text, false)!}
              handleViewAllClick={() => {
                handleGameTypeClick(category.gameType);
              }}
              gameTypeName={
                gameTypeList.find((item) => item.gameType === category.gameType)
                  ?.key || ""
              }
              groupBy_gameType={Object.values(groupBy_gameType)}
            />
          );
        } else {
          //  others
          return (
            <LobbyCategory
              key={category.key}
              iconUrl={category.iconUrl}
              text={category.text}
              gameType={category.gameType}
              showDataLength={showCategoryAmount(category.text, true)!}
              handleViewAllClick={() => {
                handleGameTypeClick(category.gameType);
              }}
              gameTypeName={
                gameTypeList.find((item) => item.gameType === category.gameType)
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
