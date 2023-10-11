import ButtonText from '@/components/Mobile/components/ButtonText';
import CategoryLabel from '@/components/Mobile/components/CategoryLabel';
import { useGameStore } from '@/hooks/stores/useGameStore';
import getDisplayGameType from '@/utils/getDisplayGameType';
import { useMemo } from "react";
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
              key={game.gpcode}
              imageUrl={`${process.env.PUBLIC_URL}/assets/images/home/${gameTypeName}/${game?.gpcode}.png`}
              venderLogo={`${process.env.PUBLIC_URL}/assets/images/home/provider_logo/${gameTypeName}/${game?.gpcode}.png`}
            />
          )
        })}
      </CategoryContent>
    </Wrapper>
  );
};

export default LobbyCategory;