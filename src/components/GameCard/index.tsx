import playIcon from "@/assets/t18/images/home/mobile/play.svg";
import config from "@/config/config";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGameStore } from "@/hooks/stores/useGameStore";
import { useRwd } from "@/hooks/useRwd";
import { media } from "@/theme/breakpoints";
import Common from "@/utils/Common";
import { MouseEvent } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { badgeList } from "../../constants/games";
import Favorite from "../Favorite";

const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  border-radius: 10px;
  display: none;
  text-align: center;
  cursor: pointer;
`;

const GameCardWrapper = styled.div`
  width: calc(50% - 8px);
  height: 184px;
  position: relative;
  border: 1px solid ${(props) => props.theme.tertiary};
  border-radius: 10px;

  ${media.sm} {
    width: calc(25% - 12px);

    &:hover ${CardHoverBg} {
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

const GameImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikeIcon = styled.div<{ $imageUrl: string }>`
  width: 30px;
  height: 30px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: absolute;
  top: 6px;
  right: 8px;
  border-radius: 50%;
  background-color: #ffffff1f;
`;

const BadgeIcon = styled.div<{ $imageUrl: string }>`
  width: 45.5px;
  height: 21px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`;

const NewBadgeIcon = styled.div<{ $imageUrl: string }>`
  width: 45.5px;
  height: 21px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: absolute;
  top: 25px;
  left: 0;
`;

const GameName = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  color: ${(props) => props.theme.tertiary};
  font-size: 1.25rem;
`;

const HoverGameName = styled.div`
  color: ${(props) => props.theme.white};
  text-align: center;
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const MaintenanceBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  border-radius: 0 0 10px 10px;
  padding: 7px;
`;

const MaintenanceContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.primary};
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const MaintenanceText = styled.div`
  color: ${(props) => props.theme.white};
  font-size: 1.2rem;
  font-weight: 900;
  text-align: center;
`;

type GameCardProps = {
  gameItem: {
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
  selectedTag: string;
  favoriteList: number[];
  fetchFavoriteList: () => void;
  isFavorite: boolean;
  isActive: boolean;
};

const GameCard = ({
  gameItem,
  selectedTag,
  favoriteList,
  fetchFavoriteList,
  isFavorite,
  isActive,
}: GameCardProps) => {
  const { setFavoriteGame, removeFavoriteGame } = useGameStore();
  const { account } = useAccountStore();
  const history = useHistory();
  const { isDesktopSize, isMobileSize } = useRwd();

  const launchGame = () => {
    if (!account.token) {
      history.push("/login");
    } else {
      Common.closePreviousPopup();
      Common.PopupCenter(
        `/joingame/${gameItem.id}/${gameItem.gpcode}`,
        "gamewindow"
      );
    }
  };

  const handleToggleFavorite = async (event: MouseEvent, gameId: number) => {
    event.stopPropagation();
    if (!account.token) {
      history.push("/login");
    } else {
      if (!!favoriteList.length && favoriteList.includes(gameId)) {
        await removeFavoriteGame(gameId);
        fetchFavoriteList();
      } else {
        await setFavoriteGame(gameId);
        fetchFavoriteList();
      }
    }
  };

  return (
    <>
      <GameCardWrapper onClick={launchGame}>
        <GameImage
          src={`${config.sourceUrl
            }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code
            }.jpg`}
          alt={gameItem.name}
        />

        {isMobileSize && (
          <Favorite
            isFavorite={isFavorite}
            handleToggleFavorite={handleToggleFavorite}
            gameItemId={gameItem.id}
          />
        )}

        {gameItem.tag.hot && gameItem.tag.new && selectedTag === "All" && (
          <>
            <BadgeIcon $imageUrl={badgeList.hot} />
            <NewBadgeIcon $imageUrl={badgeList.new} />
          </>
        )}
        {gameItem.tag.hot && selectedTag === "Hot" && (
          <BadgeIcon $imageUrl={badgeList.hot} />
        )}
        {gameItem.tag.new && selectedTag === "New" && (
          <BadgeIcon $imageUrl={badgeList.new} />
        )}

        {/* to-do: if show game name while imageUrl return 404 */}
        {/* <GameName>{gameItem.name}</GameName> */}
        {!isActive && (
          <MaintenanceBg>
            <MaintenanceContent>
              <MaintenanceText> BE BACK SOON</MaintenanceText>
            </MaintenanceContent>
          </MaintenanceBg>
        )}

        <CardHoverBg>
          {isDesktopSize && (
            <Favorite
              isFavorite={isFavorite}
              handleToggleFavorite={handleToggleFavorite}
              gameItemId={gameItem.id}
            />
          )}
          {gameItem.name && <HoverGameName>{gameItem.name}</HoverGameName>}
          <img src={playIcon} alt={"play"} />
        </CardHoverBg>
      </GameCardWrapper>
    </>
  );
};

export default GameCard;
