import { GameService } from '@/api-services/services/GameService';
import dislikeIcon from "@/assets/images/home/mobile/dislike.png";
import likeIcon from "@/assets/images/home/mobile/like.png";
import config from '@/config/config';
import Common from '@/utils/Common';
import styled from 'styled-components';
import { badgeList } from '../../constants/games';

const GameCardWrapper = styled.div<{ imageUrl: string }>`
  width: calc(50% - 8px);
  padding-top: calc(50% - 8px);
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  box-sizing: border-box;
  position: relative;
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
    isFavorite: boolean;
  };
  selectedTag: string;
}

type Props = {
  imageUrl: string;
}

const GameCard = ({ gameItem, selectedTag }: GameCardProps) => {

  const launchGame = () => {
    GameService.JoinGame(gameItem.id, gameItem.gpcode).then((response) => {
      if (response?.IsSuccess) {
        window.location.href = response?.data?.url;
      } else {
        console.log(response?.info);
      }
    })
  };

  return (
    <GameCardWrapper
      onClick={launchGame}
      imageUrl={`${config.sourceUrl}${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code}.jpg`}
    >
      {gameItem.isFavorite ? (
        <LikeIcon imageUrl={likeIcon} />
      ) : (
        <LikeIcon imageUrl={dislikeIcon} />
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
    </GameCardWrapper>
  );
};

export default GameCard;
