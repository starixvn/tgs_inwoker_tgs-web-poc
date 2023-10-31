import playIcon from "@/assets/t18/images/home/mobile/play.svg";
import config from "@/config/config";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { useGameStore } from "@/hooks/stores/useGameStore";
import useDynamicFontSize from "@/hooks/useDynamicFontSize";
import { useRwd } from "@/hooks/useRwd";
import { media } from "@/theme/breakpoints";
import Common from "@/utils/Common";
import { MouseEvent, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { badgeList } from "../../constants/games";
import Favorite from "../Favorite";

// -------- hover effect for desktop--------------
const CardHoverBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(0 0 0 / 80%);
  border-radius: 10px;
  padding: 0 5px;
  display: none;
  white-space: pre-line;
`;

const GameCardWrapper = styled.div`
  width: calc(50% - 8px);
  position: relative;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;

    &::before {
      content: '';
      display: block;
      padding-top: calc(184px / 184px * 100%);
      width: 100%;
    }

  ${media.sm} {
    width: calc(25% - 12px);
    min-width: 184px;

    &:hover {
      ${CardHoverBg} {
        z-index: 1;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

const HoverGameName = styled(GameCardWrapper)`
  color: ${(props) => props.theme.white};
  font-size: 1rem;
  text-align: center;
  margin-bottom: 16px;
`;

const PlayIcon = styled.img`
  width: 65px;
  height: 65px;
`;

const GameImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  const gameNameRef = useRef<HTMLDivElement | null>(null);
  const { resizeText } = useDynamicFontSize();

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

  useEffect(() => {
    if (gameNameRef.current) {
      resizeText({ container: gameNameRef.current, text: gameNameRef.current });
    }
    if (gameNameRef.current) {
      resizeText({ container: gameNameRef.current, text: gameNameRef.current });
    }
  }, [resizeText, gameNameRef.current, gameNameRef.current]);


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
          {gameItem.name && <HoverGameName ref={gameNameRef}>{gameItem.name}</HoverGameName>}
          <PlayIcon src={playIcon} alt={"play"} />
        </CardHoverBg>
      </GameCardWrapper>
    </>
  );
};

export default GameCard;
