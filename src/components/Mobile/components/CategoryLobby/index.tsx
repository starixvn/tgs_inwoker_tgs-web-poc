import example from '@/assets/images/home/mobile/example.png';
import ButtonText from '@/components/Mobile/components/ButtonText';
import CategoryLabel from '@/components/Mobile/components/CategoryLabel';
import styled from 'styled-components';
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
  lobbyAllGameData?: [
    {
      name: string;
      abbreviation: string;
    }
  ];
}

const CategoryLobby = ({
  iconUrl,
  text,
  lobbyAllGameData,
}: Props) => {
  return (
    <Wrapper>
      <CategoryTitle>
        <CategoryLabel imageUrl={iconUrl} text={text} />
        <ButtonText size="small" text={"View all"} />
      </CategoryTitle>
      <CategoryContent>
        {lobbyAllGameData && lobbyAllGameData.map((game) => {
          return (
            <CardVendor
              key={game.abbreviation}
              imageUrl={example}
              gameName={game.name}
              venderName={game.abbreviation}
            />
          )
        })}
      </CategoryContent>
      <ButtonContainer>
        <ButtonText size="large" text={"Load more"} />
      </ButtonContainer>
    </Wrapper>
  );
};

export default CategoryLobby;

//結構調整 - 這個目前沒在用