import styled from "styled-components"
import Level1Icon from "@/assets/images/bettingBonus/level_1.svg"
import Level3Icon from "@/assets/images/bettingBonus/level_3.svg"
import Level5Icon from "@/assets/images/bettingBonus/level_5.svg"
import Arrow from "@/assets/images/bettingBonus/icon_arrow.svg"

const Container = styled.div`
  padding: 20px 10px;
`
const CurrentLevelBanner = styled.div`
  width: 408px;
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
  width: 251px;
  margin-top: 20px;
  position: absolute;
  right: 17px;
`
const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
const GameName = styled.div`
  font-size: 1rem;
  color: #fff;
  width: 52px;
  font-weight: 500;
`
const CurrentRate = styled.div`
  font-size: 1rem;
  color: #33AD4E;
  font-weight: 700;
`
const NextRate = styled.div`
  color: #6A768B;
  font-weight: 700;
`
const LevelTag = styled.div`
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

// fake data
const currentLevelListByGame = [
  {
    name: "Card Game",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "Live Casino",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "Lottery",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "Slots",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "Sports",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "ESports",
    level1: "0.20%",
    level2: "0.25%",
  },
]
const BettingBonus = () => {
  return (
    <Container>
      <CurrentLevelBanner>
        <LevelIconContainer>
          <img src={Level1Icon} width={"98px"} height={"98px"}/>
        </LevelIconContainer>
        <TableContainer>
          <TableRow key="tag">
            <GameName/>
            <CurrentLevelTag>CurrentV0</CurrentLevelTag>
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
      </CurrentLevelBanner>
    </Container>
  )
}

export default BettingBonus