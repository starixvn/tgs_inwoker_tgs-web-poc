import styled from "styled-components"
import Level1Icon from "@/assets/images/bettingBonus/level_1.svg"
import Level3Icon from "@/assets/images/bettingBonus/level_3.svg"
import Level5Icon from "@/assets/images/bettingBonus/level_5.svg"
import Arrow from "@/assets/images/bettingBonus/icon_arrow.svg"

const CurrentLevelBannerContainer = styled.div`
  width: 408px;
  min-width: 355px;
  height: 307px;
  border-radius: 20px;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  background-image: url(${`${process.env.PUBLIC_URL}/assets/images/mobile/bettingBonus/current_level_bg.png`});
`
const LevelIconContainer = styled.div`
  position: absolute;
  top: 125px;
  left: 14px;
  transform: translateY(-50%);
`
const TableContainer = styled.div`
  max-width: 251px;
  min-width: 220px;
  margin-top: 24px;
  position: absolute;
  right: 17px;
`
const TableRow = styled.div`
  display: flex;
  flex: 50px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`
const TableCell = styled.div`
  flex: 1;
  text-align: center;
`
const GameName = styled(TableCell)`
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
  word-break: keep-all;
  text-align: start;
`
const CurrentRate = styled(TableCell)`
  font-size: 1rem;
  color: #33AD4E;
  font-weight: 700;
`
const NextRate = styled(TableCell)`
  color: #6A768B;
  font-weight: 700;
`
const LevelTag = styled(TableCell)`
  font-size: 0.75rem;
  border-radius: 5px;
  color: #fff;
  width: 63px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const CurrentLevelTag = styled(LevelTag)`
  background: #33AD4E;
`
const NextLevelTag = styled(LevelTag)`
  background: #FF9A02;
`


const CurrentLevelBanner = ({
  currentLevelListByGame
}: {
  currentLevelListByGame: Array<{
    name: string;
    level1: string;
    level2: string;
  }>
}) => {
  return (
    <CurrentLevelBannerContainer>
    <LevelIconContainer>
      <img src={Level1Icon} width={"98px"} height={"98px"}/>
    </LevelIconContainer>
    <TableContainer>
      <TableRow key="tag">
        <GameName/>
        <CurrentLevelTag>CurrentV0</CurrentLevelTag>
        <div style={{width: "32px"}}></div>
        <NextLevelTag>NextV1</NextLevelTag>
      </TableRow>
      {
        currentLevelListByGame.map((item, index) => {
          return (
            <TableRow key={index}>
              <GameName>{item.name}</GameName>
              <CurrentRate>{item.level1}</CurrentRate>
              <img src={Arrow} width={"32px"} height={"32px"}/>
              <NextRate>{item.level2}</NextRate>
            </TableRow>
          )
        })
      }
    </TableContainer>
  </CurrentLevelBannerContainer>
  )
}

export default CurrentLevelBanner