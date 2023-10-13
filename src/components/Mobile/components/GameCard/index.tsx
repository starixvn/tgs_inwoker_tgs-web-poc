import { GameService } from '@/api-services/services/GameService';
import dislikeIcon from "@/assets/images/home/mobile/dislike.png";
import likeIcon from "@/assets/images/home/mobile/like.png";
import config from '@/config/config';
import { useGameStore } from '@/hooks/stores/useGameStore';
import Common from '@/utils/Common';
import styled from 'styled-components';
import { badgeList } from '../../constants/games';

const GameCardWrapper = styled.div<{ imageUrl: string }>`
  position: relative;
  width: calc(50% - 8px);
  padding-top: calc(50% - 8px);
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: relative;
  border: 1px solid ${(props) => props.theme.tertiary};
`;

const LikeIcon = styled.div<{ imageUrl: string }>`
  width: 30px;
  height: 30px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: absolute;
  top: 6px;
  right: 8px;
  border-radius: 50%;
  background-color: #ffffff1f;
`;

const BadgeIcon = styled.div<{ imageUrl: string }>`
  width: 45.5px;
  height: 21px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`;

const NewBadgeIcon = styled.div<{ imageUrl: string }>`
  width: 45.5px;
  height: 21px;
  background-image: url(${props => props.imageUrl});
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
}

const GameCard = ({ gameItem, selectedTag, favoriteList, fetchFavoriteList, isFavorite }: GameCardProps) => {
  const { setFavoriteGame, removeFavoriteGame } = useGameStore();


  const launchGame = () => {
    GameService.JoinGame(gameItem.id, gameItem.gpcode).then((response) => {
      if (response?.IsSuccess) {
        window.location.href = response?.data?.url;
      } else {
        console.log(response?.info);
      }
    })
  };

  const handleToggleFavorite = async (event, gameId: number) => {
    event.stopPropagation();
    if (!!favoriteList.length && favoriteList.includes(gameId)) {
      await removeFavoriteGame(gameId);
      fetchFavoriteList();
    } else {
      await setFavoriteGame(gameId);
      fetchFavoriteList();
    }
  };

  return (
    <GameCardWrapper
      onClick={launchGame}
      imageUrl={`${config.sourceUrl}${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code}.jpg`}
    >
      {isFavorite ? (
        <LikeIcon imageUrl={likeIcon} onClick={(event) => handleToggleFavorite(event, gameItem.id)} />
      ) : (
        <LikeIcon imageUrl={dislikeIcon} onClick={(event) => handleToggleFavorite(event, gameItem.id)} />
      )}

      {gameItem.tag.hot && gameItem.tag.new && selectedTag === "All" && (
        <>
          <BadgeIcon imageUrl={badgeList.hot} />
          <NewBadgeIcon imageUrl={badgeList.new} />
        </>
      )}
      {gameItem.tag.hot && selectedTag === "Hot" && (
        <BadgeIcon imageUrl={badgeList.hot} />
      )}
      {gameItem.tag.new && selectedTag === "New" && (
        <BadgeIcon imageUrl={badgeList.new} />
      )}

      {/* to-do: if show game name while imageUrl return 404 */}
      {/* <GameName>{gameItem.name}</GameName> */}
    </GameCardWrapper>
  );
};

export default GameCard;
