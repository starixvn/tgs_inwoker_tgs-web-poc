import { GameService } from "@/api-services/services/GameService";
import ButtonText from "@/components/ButtonText";
import CategoryLabel from "@/components/CategoryLabel";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useRwd } from "@/hooks/useRwd";
import Common from "@/utils/Common";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import CardVendor from "../CardVender";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type Props = {
  iconUrl: string;
  text: string;
  gameType: number;
  gameTag: string;
  showDataLength: number;
  handleViewAllClick: () => void;
  gameTypeName: string;
  groupBy_gameType: GroupByGameItem[];
};

export type GroupByGameItem = {
  abbreviation: string;
  game_platform_id: number;
  game_platform_name: string;
  is_try: number;
  name: string;
  params: null | string;
  gpcode: string;
  type: number;
  status: number;
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
};

const LobbyTagCategory = ({
  iconUrl,
  text,
  gameType,
  gameTag,
  showDataLength,
  handleViewAllClick,
  gameTypeName,
  groupBy_gameType,
}: Props) => {
  const { account } = useAccountStore();
  const history = useHistory();
  const [filteredGameList, setFilteredGameList] = useState<any[]>([]);
  const [visibleGameCount, setVisibleGameCount] = useState(showDataLength);
  const [isLoading, setIsLoading] = useState(false);
  const { isMobileSize, isDesktopSize } = useRwd();

  const statusMap = groupBy_gameType.reduce((accumulator, group) => {
    group.forEach((item) => {
      accumulator[item.gpcode] = item.status;
    });
    return accumulator;
  }, {});

  const handleLoadMoreClick = () => {
    setVisibleGameCount(visibleGameCount + showDataLength);
  };

  const launchGame = (id: number, gpcode: string) => {
    if (!account.token) {
      history.push("/login");
    } else {
      Common.closePreviousPopup();
      Common.PopupCenter(`/joingame/${id}/${gpcode}`, "gamewindow");

      const gameWindow = window.open("", "gamewindow");

      if (gameWindow) {
        gameWindow.document.open();
        gameWindow.document.write("Loading");
        gameWindow.document.close();

        GameService.JoinGame(id, gpcode).then((response) => {
          if (response?.IsSuccess) {
            gameWindow.location.href = response?.data?.url;
          } else {
            console.log(response?.info);
            gameWindow.close();
          }
        });
      }
    }
  };

  useEffect(() => {
    if (gameType && gameTag) {
      GameService.GetGameList("", gameType).then((res) => {
        setIsLoading(true);
        if (res && res.data) {
          switch (gameTag) {
            case "Hot":
              setIsLoading(false);
              return setFilteredGameList(
                res.data.filter((item: GameItem) => item.tag.hot)
              );
            case "New":
              setIsLoading(false);
              return setFilteredGameList(
                res.data.filter((item: GameItem) => item.tag.new)
              );
            case "Recommend":
              setIsLoading(false);
              return setFilteredGameList(
                res.data.filter((item: GameItem) => item.tag.recommend)
              );
            default:
              setIsLoading(false);
              return setFilteredGameList(res.data);
          }
        }
      });
    }
  }, [gameType, gameTag]);

  if (!filteredGameList.length) {
    return null;
  }

  return (
    <Wrapper>
      <CategoryTitle>
        <CategoryLabel imageUrl={iconUrl} text={text} />
        <ButtonText
          size="small"
          text={"View all"}
          onClick={handleViewAllClick}
        />
      </CategoryTitle>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <CategoryContent>
          {filteredGameList.slice(0, visibleGameCount).map((game) => {
            return (
              <CardVendor
                key={game?.id}
                imageUrl={`${process.env.PUBLIC_URL}/assets/images/home/${gameTypeName}/${game?.gpcode}.png`}
                gameName={game?.name}
                venderName={game?.gpcode}
                launchGame={() => launchGame(game?.id, game?.gpcode)}
                status={statusMap[game?.gpcode]}
              />
            );
          })}
        </CategoryContent>
      )}

      {isMobileSize && visibleGameCount < filteredGameList.length && gameTag === "Hot" && (
        <ButtonContainer>
          <ButtonText
            size="large"
            text={"Load more"}
            onClick={handleLoadMoreClick}
          />
        </ButtonContainer>
      )}

      {isDesktopSize && visibleGameCount < filteredGameList.length && (gameTag === "Hot" || gameTag === "New" || gameTag === "Recommend") && (
        <ButtonContainer>
          <ButtonText
            size="large"
            text={"Load more"}
            onClick={handleLoadMoreClick}
          />
        </ButtonContainer>
      )}
    </Wrapper>
  );
};

export default LobbyTagCategory;
