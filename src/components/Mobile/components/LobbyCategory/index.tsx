import { GameService } from '@/api-services/services/GameService';
import { GameTypeEnum } from '@/api-services/utils/Enum';
import ButtonText from '@/components/Mobile/components/ButtonText';
import CategoryLabel from '@/components/Mobile/components/CategoryLabel';
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGameStore } from '@/hooks/stores/useGameStore';
import Common from '@/utils/Common';
import getDisplayGameType from '@/utils/getDisplayGameType';
import { useMemo } from "react";
import { useHistory } from 'react-router';
import styled from 'styled-components';
import CardVendor from '../CardVender';

const Wrapper = styled.div`
    width: 100%;
    margin: 15px 0;
`;

const CategoryTitle = styled.div`    
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const CategoryContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 15px;
    width: 100%;
    margin-bottom: 30px;
`;

type Props = {
  iconUrl: string;
  text: string;
  gameType: number;
  showDataLength: number;
  handleViewAllClick: () => void;
  gameTypeName: string;
}

const LobbyCategory = ({
  iconUrl,
  text,
  gameType,
  showDataLength,
  handleViewAllClick,
  gameTypeName
}: Props) => {
  const { game } = useGameStore();
  const { account } = useAccountStore();
  const history = useHistory();

  const launchLobbyGame = (gpcode: string) => {
    if (!account.token) {
      history.push("/login");
    } else {
      if (gameType === GameTypeEnum.COCKFIGHT) {
        // 以後SM01不會開,多新增AWC_COCKFIGHT(缺對應api)
        if (gpcode === "SM01") {
          const gameWindow = window.open("", "Cockfight");
          if (gameWindow) {
            GameService.GetCockfight()
              .then((res) => {
                gameWindow.document.write(res?.data);
                gameWindow.document.close();
                gameWindow.focus();
              })
              .catch(() => {
                gameWindow.close();
              });
          }
        }
        else {
          Common.closePreviousPopup();
          Common.PopupCenter(
            "/joinlobbygame/" + GameTypeEnum.SPORTS + "/" + gpcode,
            "gamewindow"
          );
        }
      } else {
        Common.closePreviousPopup();
        Common.PopupCenter("/joinlobbygame/" + gameType, "gamewindow");

        const gameWindow = window.open("", "gamewindow");

        if (gameWindow) {
          GameService.JoinLobbyGame(gameType, gpcode).then((response) => {
            if (response?.IsSuccess) {
              gameWindow.location.href = response?.data?.url;
            } else {
              console.log(response?.info);
              gameWindow.close();
            }
          });
        }
      }
    }
  };

  const groupBy_gameType = useMemo(() => {
    const providedGameTypes: number[] = getDisplayGameType();
    const providedGameTypesSet = new Set(providedGameTypes);

    if (!game.homePageGameList || game.homePageGameList.length === 0) {
      return {};
    }

    const groups = game.homePageGameList.reduce((accumulator, game) => {
      const { type, ...rest } = game;
      if (!accumulator[type]) {
        accumulator[type] = [];
      }
      accumulator[type].push(rest);
      return accumulator;
    }, {});

    const filteredGroups: { [key: number]: any[] } = {};
    Object.keys(groups).forEach((key) => {
      const gameType = parseInt(key, 10);
      if (providedGameTypesSet.has(gameType)) {
        filteredGroups[gameType] = groups[key];
      }
    });
    return filteredGroups;

  }, [game.homePageGameList]);

  if (!groupBy_gameType[gameType]) {
    return null;
  }

  return (
    <Wrapper>
      <CategoryTitle>
        <CategoryLabel imageUrl={iconUrl} text={text} />
        <ButtonText size="small" text={"View all"} onClick={handleViewAllClick} />
      </CategoryTitle>

      <CategoryContent>
        {groupBy_gameType[gameType] && groupBy_gameType[gameType].slice(0, showDataLength).map((game) => {
          return (
            <CardVendor
              key={game?.gpcode}
              imageUrl={`${process.env.PUBLIC_URL}/assets/images/home/${gameTypeName}/${game?.gpcode}.png`}
              venderLogoUrl={`${process.env.PUBLIC_URL}/assets/images/home/provider_logo/${gameTypeName}/${game?.gpcode}.png`}
              launchGame={() => launchLobbyGame(game?.gpcode)}
            />
          )
        })}
      </CategoryContent>
    </Wrapper>
  );
};

export default LobbyCategory;