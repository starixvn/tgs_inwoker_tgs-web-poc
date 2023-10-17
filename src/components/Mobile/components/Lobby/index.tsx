import { GameTypeEnum } from '@/api-services/utils/Enum';
import LobbyCategory from '@/components/Mobile/components/LobbyCategory';
import LobbyTagCategory from '@/components/Mobile/components/LobbyTagCategory';
import styled from 'styled-components';
import { gameTypeList, lobbyCategoryList } from "../../constants/tab";
import { GroupByGameItem } from "../LobbyTagCategory";

const LobbyContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;
`;

type Props = {
  handleGameTypeClick: (gameType: number) => void;
  groupBy_gameType: { [key in number]: GroupByGameItem }
};


const Lobby = ({
  handleGameTypeClick,
  groupBy_gameType
}: Props) => {
  return (
    <LobbyContainer>
      {Object.values(lobbyCategoryList).map((category) => {
        if (
          [GameTypeEnum.SLOT, GameTypeEnum.FISH, GameTypeEnum.TABLEGAME].includes(
            category.gameType
          )
        ) {
          //  slots, fishing, and egame (with games)
          return (
            <LobbyTagCategory
              key={category.key}
              iconUrl={category.iconUrl}
              text={category.text}
              gameType={category.gameType}
              gameTag={category.text}
              showDataLength={category.text === "Hot" ? 9 : 6}
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
              showDataLength={3}
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
