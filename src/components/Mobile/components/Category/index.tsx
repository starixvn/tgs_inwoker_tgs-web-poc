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
  gameTypeName: string;
};

const Category = ({
  gameTypeData,
  gameTypeName
}: Props) => {
  return (
    <Wrapper>
      <CategoryContent>
        {!!gameTypeData.length && gameTypeData.map((game) => {
          if (game?.gpcode === "BC") return null;
          return (
            <CardVendor
              key={game?.gpcode}
              imageUrl={`${process.env.PUBLIC_URL}/assets/images/home/${gameTypeName}/${game?.gpcode}.png`}
              venderLogo={`${process.env.PUBLIC_URL}/assets/images/home/provider_logo/${gameTypeName}/${game?.gpcode}.png`}
            />
          )
        })}
        {!gameTypeData.length && <div>No data</div>}
      </CategoryContent>
    </Wrapper>
  );
};

export default Category;