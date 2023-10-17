import styled from "styled-components";
import Arrow from "@/assets/images/bettingBonus/icon_arrow.svg";
import LevelIcon from "@/components/UI/LevelIcon";
import { TypeProductRebateByLevel } from "@/components/Mobile/pages/BettingBonus";

const CurrentLevelBannerContainer = styled.div`
  width: 100%;
  min-width: 355px;
  height: 307px;
  border-radius: 20px;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 17px;
  background-image: url(${`${process.env.PUBLIC_URL}/assets/images/mobile/bettingBonus/current_level_bg.png`});
  background-position: left center;
`;
const LevelIconContainer = styled.div`
  position: absolute;
  top: 120px;
  left: 10%; // TODO: 調整位置
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
`;
const TableContainer = styled.div`
  width: 68%;
  right: 17px;
`;
const TableRow = styled.div`
  display: flex;
  flex: 50px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
const TableCell = styled.div`
  flex: 1;
  text-align: center;
`;
const GameName = styled(TableCell)`
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
  word-break: keep-all;
  text-align: start;
`;
const CurrentRate = styled(TableCell)`
  font-size: 1rem;
  color: #33ad4e;
  font-weight: 700;
`;
const NextRate = styled(TableCell)`
  color: #6a768b;
  font-weight: 700;
`;
const LevelTag = styled(TableCell)`
  font-size: 0.75rem;
  border-radius: 5px;
  color: #fff;
  width: 63px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CurrentLevelTag = styled(LevelTag)`
  background: #33ad4e;
`;
const NextLevelTag = styled(LevelTag)`
  background: #ff9a02;
`;

const CurrentLevelBanner = ({
  level,
  productRebateByLevel,
}: {
  level: number;
  productRebateByLevel: TypeProductRebateByLevel[];
}) => {
  return (
    <CurrentLevelBannerContainer>
      <LevelIconContainer>
        <LevelIcon level={level} width={"100px"} />
      </LevelIconContainer>
      <TableContainer>
        <TableRow key="tag">
          <GameName />
          <CurrentLevelTag>{`CurrentV${level}`}</CurrentLevelTag>
          <div style={{ width: "32px" }}></div>
          <NextLevelTag>{`NextV${level + 1}`}</NextLevelTag>
        </TableRow>
        {productRebateByLevel.map((product, index) => {
          const rebateList = product.rebate;
          const currentRate = rebateList[level - 1];
          const nextRate = rebateList[level];
          return (
            <TableRow key={index}>
              <GameName>{product.name}</GameName>
              <CurrentRate>{currentRate}%</CurrentRate>
              <img src={Arrow} width={"32px"} height={"32px"} />
              <NextRate>{nextRate}%</NextRate>
            </TableRow>
          );
        })}
      </TableContainer>
    </CurrentLevelBannerContainer>
  );
};

export default CurrentLevelBanner;
