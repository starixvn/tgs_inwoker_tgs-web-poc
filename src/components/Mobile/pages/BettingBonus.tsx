import styled from "styled-components"
import Level1Icon from "@/assets/images/bettingBonus/level_1.svg"
import Level3Icon from "@/assets/images/bettingBonus/level_3.svg"
import Level5Icon from "@/assets/images/bettingBonus/level_5.svg"
import Arrow from "@/assets/images/bettingBonus/icon_arrow.svg"
import CurrentLevelBanner from "@/components/Mobile/components/BettingBonus/CurrentLevelBanner"

const Container = styled.div`
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

// fake data
const currentLevelListByGame = [
  {
    name: "Live Dealer",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "Sports book",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "E-Game",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "Card Game",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "Lottery",
    level1: "0.20%",
    level2: "0.25%",
  },
  {
    name: "Virtual Sports",
    level1: "0.20%",
    level2: "0.25%",
  },
]
const BettingBonus = () => {
  return (
    <Container>
      <CurrentLevelBanner currentLevelListByGame={currentLevelListByGame}/>
    </Container>
  )
}

export default BettingBonus