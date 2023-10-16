import styled from "styled-components";
import { TypeProductRebateByLevel } from "@/components/Mobile/pages/BettingBonus";
import LevelIcon from "@/components/Mobile/components/UI/LevelIcon";

const LevelTableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0 10px;
`;
const Header = styled.thead``;
const HeaderRow = styled.tr`
  height: 32px;
`;
const HeaderItem = styled.th`
  color: #6a768b;
  font-size: 0.875rem;
`;
const LevelHeaderItem = styled(HeaderItem)`
  width: 70px;
`;
const Row = styled.tr`
  color: #b2c3ec;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  position: relative;
  width: 100%;
  height: 67px;
  background-color: #181f2b;

  td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const LevelTableRow = ({
  level,
  isCurrentLevel,
  bonusList,
}: {
  level: number;
  isCurrentLevel: boolean;
  bonusList: number[];
}) => {
  return (
    <Row>
      <td>
        <LevelIcon
          isCurrentLevel={isCurrentLevel}
          level={level}
          width={"57px"}
        />
      </td>
      {bonusList.map((bonus, index) => {
        return <td key={index}>{bonus}%</td>;
      })}
    </Row>
  );
};

const LevelTable = ({
  currentLevel,
  productRebateByLevel,
}: {
  currentLevel: number;
  productRebateByLevel: TypeProductRebateByLevel[];
}) => {
  const gameList = productRebateByLevel.map((productRebate) => {
    return productRebate.name;
  });

  const firstProductRebate = productRebateByLevel[0];
  const maxLevel = firstProductRebate.rebate.length;
  const levelList = Array.from({ length: maxLevel }, (_, i) => i + 1);

  const getRebateList = (level: number) => {
    return productRebateByLevel.map((productRebate) => {
      const rebateList = productRebate.rebate;
      return rebateList[level - 1];
    });
  };

  return (
    <LevelTableContainer>
      <Header>
        <HeaderRow>
          <LevelHeaderItem>Level</LevelHeaderItem>
          {gameList.map((game) => (
            <HeaderItem key={game}>{game}</HeaderItem>
          ))}
        </HeaderRow>
      </Header>
      <tbody>
        {levelList.map((level) => {
          return (
            <LevelTableRow
              key={level}
              level={level}
              isCurrentLevel={currentLevel === level}
              bonusList={getRebateList(level)}
            />
          );
        })}
      </tbody>
    </LevelTableContainer>
  );
};

export default LevelTable;
