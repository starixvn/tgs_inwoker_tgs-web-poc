import styled from 'styled-components';
import CardVendor from '../CardVender';

const Wrapper = styled.div`
    width: 100%;
    margin: 15px 0;
`;

const CategoryContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 15px;
    width: 100%;
    margin-bottom: 30px;
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
};

const Category = ({
  gameTypeData
}: Props) => {
  return (
    <Wrapper>
      <CategoryContent>
        {gameTypeData && gameTypeData.map((game) => {
          return (
            <CardVendor
              key={game?.abbreviation}
              imageUrl={process.env.PUBLIC_URL + "/assets/images/home/liveCasino/" + game?.abbreviation + ".png"}
              venderLogo={process.env.PUBLIC_URL + "/assets/images/home/provider/liveCasino/" + game?.abbreviation + ".png"}
            // gameName={game.name}
            // venderName={game.abbreviation}
            />
          )
        })}
      </CategoryContent>
    </Wrapper>
  );
};

export default Category;