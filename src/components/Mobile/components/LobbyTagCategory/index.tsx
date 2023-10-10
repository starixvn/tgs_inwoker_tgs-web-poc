import { GameService } from '@/api-services/services/GameService';
import ButtonText from '@/components/Mobile/components/ButtonText';
import CategoryLabel from '@/components/Mobile/components/CategoryLabel';
import config from '@/config/config';
import Common from '@/utils/Common';
import { useEffect, useState } from "react";
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
  handleViewAllClick: (gameType: number) => void;
}

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
}

const LobbyTagCategory = ({
  iconUrl,
  text,
  gameType,
  gameTag,
  showDataLength,
  handleViewAllClick
}: Props) => {
  const [filteredGameList, setFilteredGameList] = useState<any[]>([]);
  const [visibleGameCount, setVisibleGameCount] = useState(showDataLength);

  const handleLoadMoreClick = () => {
    setVisibleGameCount(visibleGameCount + showDataLength);
  };

  useEffect(() => {
    if (gameType && gameTag) {
      GameService.GetGameList("", gameType).then((res) => {
        if (res && res.data) {
          switch (gameTag) {
            case "Hot":
              return setFilteredGameList(res.data.filter((item: GameItem) => item.tag.hot));
            case "New":
              return setFilteredGameList(res.data.filter((item: GameItem) => item.tag.new));
            case "Recommend":
              return setFilteredGameList(res.data.filter((item: GameItem) => item.tag.recommend));
            default:
              return setFilteredGameList(res.data);
          }
        }
      });
    }
  }, [gameType, gameTag]);

  return (
    <Wrapper>
      <CategoryTitle>
        <CategoryLabel imageUrl={iconUrl} text={text} />
        <ButtonText size="small" text={"View all"} onClick={() => handleViewAllClick(gameType)} />
      </CategoryTitle>

      <CategoryContent>
        {filteredGameList.slice(0, visibleGameCount).map((game) => {
          return (
            <CardVendor
              key={game.id}
              imageUrl={`${config.sourceUrl}${game.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${game.code}.jpg`}
              gameName={game.name}
              venderName={game.gpcode}
            />
          )
        })}
      </CategoryContent>

      {visibleGameCount < filteredGameList.length && (
        <ButtonContainer>
          <ButtonText size="large" text={"Load more"} onClick={handleLoadMoreClick} />
        </ButtonContainer>
      )}
    </Wrapper>
  );
};

export default LobbyTagCategory;