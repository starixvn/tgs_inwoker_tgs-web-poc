import { GameService } from "@/api-services/services/GameService";
import { GameTypeEnum } from "@/api-services/utils/Enum";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { media } from "@/theme/breakpoints";
import Common from "@/utils/Common";
import { useHistory } from "react-router";
import styled from "styled-components";
import CardVendor from "../CardVender";

const CategoryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  margin-bottom: 30px;
  row-gap: 18px;
  column-gap: 15px;
  align-self: stretch;

  ${media.sm} {
    column-gap: 24.4px;
  }
`;

type GameTypeDataItem = {
  name: string;
  abbreviation: string;
  game_platform_id: number;
  game_platform_name: string;
  gpcode: string;
  is_try: number;
  params: string;
  status: number;
};

type Props = {
  gameTypeData: GameTypeDataItem[];
  gameTypeName: string;
  gameType: number;
};

const Category = ({ gameTypeData, gameTypeName, gameType }: Props) => {
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
          GameService.GetCockfight()
            .then((res) => {
              // 將加載頁面內容替換成遊戲
              if (gameWindow) {
                gameWindow.document.write(res?.data);
                gameWindow.document.close();
                gameWindow.focus();
              }
            })
            .catch(() => {
              if (gameWindow) gameWindow.close();
            });
        } else {
          Common.closePreviousPopup();
          Common.PopupCenter(
            `/joinlobbygame/${GameTypeEnum.SPORTS}/${gpcode}`,
            "gamewindow"
          );
        }
      } else {
        Common.closePreviousPopup();
        Common.PopupCenter(
          `/joinlobbygame/${gameType}/${gpcode}`,
          "gamewindow"
        );
      }
    }
  };

  const hasGameTypeData = !!gameTypeData.length;

  return (
    <CategoryContent>
      {hasGameTypeData &&
        gameTypeData.map((game) => {
          if (game?.gpcode === "BC") return null;
          return (
            <CardVendor
              key={game?.gpcode}
              imageUrl={`${process.env.PUBLIC_URL}/assets/images/home/${gameTypeName}/${game?.gpcode}.png`}
              venderLogoUrl={`${process.env.PUBLIC_URL}/assets/images/home/provider_logo/${gameTypeName}/${game?.gpcode}.png`}
              launchGame={() => launchLobbyGame(game?.gpcode)}
              status={game?.status}
              lobbyVenderName={game?.name}
            />
          );
        })}
      {!hasGameTypeData && <div>No data</div>}
    </CategoryContent>
  );
};

export default Category;
