import dislikeIcon from "@/assets/images/home/mobile/dislike.png";
import game1 from "@/assets/images/home/mobile/game1.png";
import game2 from "@/assets/images/home/mobile/game2.png";
import game3 from "@/assets/images/home/mobile/game3.png";
import game4 from "@/assets/images/home/mobile/game4.png";
import likeIcon from "@/assets/images/home/mobile/like.png";
import styled from 'styled-components';

type Props = {
    imageUrl: string;
}

const gameList = [
    {
        key: "game1",
        iconUrl: game1,
        text: "game1",
        isFavorite: false,
        tag: ""
    },
    {
        key: "game2",
        iconUrl: game2,
        text: "game2",
        isFavorite: true,
        tag: "hot"
    },
    {
        key: "game3",
        iconUrl: game3,
        text: "game3",
        isFavorite: false,
        tag: ""
    },
    {
        key: "game4",
        iconUrl: game4,
        text: "game4",
        isFavorite: true,
        tag: "new"
    }
]

const GameCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 16px;
    width: 100%;
    margin: 15px 0;
`;

const GameCard = styled.div`
    width: calc(50% - 8px);
    height: 184px;
    background-image: url(${(props: Props) => props.imageUrl});
    background-size: cover;
    box-sizing: border-box;
    position: relative;
`;

const LikeIcon = styled.div`
    width: 30px;
    height: 30px;
    background-image: url(${(props: Props) => props.imageUrl});
    background-size: cover;
    box-sizing: border-box;
    position: absolute;
    top: 6px;
    right: 8px;
`;

const Games = () => {
    return (
        <GameCardContainer>
            {gameList.map(item => (
                <>
                    <GameCard
                        key={item.key}
                        imageUrl={item.iconUrl}
                    >
                        {item.isFavorite ? <LikeIcon
                            imageUrl={likeIcon}
                        /> : <LikeIcon
                            imageUrl={dislikeIcon}
                        />}
                    </GameCard>
                </>
            ))}
        </GameCardContainer>
    );
};

export default Games;
