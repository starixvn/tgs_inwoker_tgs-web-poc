import Level1Icon from "@/assets/images/bettingBonus/level_1.svg"
import Level3Icon from "@/assets/images/bettingBonus/level_3.svg"
import Level5Icon from "@/assets/images/bettingBonus/level_5.svg"
import styled from "styled-components"

const type1 = 'type1'
const type3 = 'type3'
const type5 = 'type5'

const LevelIconContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const LevelText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({levelType}: {
    levelType: string;
  }) => {
    switch (levelType) {
      case type1:
        return `translateX(-55%) translateY(-60%);`
      case type3:
        return `translateX(-55%) translateY(-55%);`
      case type5:
        return `translateX(-55%) translateY(-50%);`
    }
  }};
  font-style: italic;
  color: #ffffff;
  font-size: 1.25rem;
  text-stroke: 2px #E5C0A2;
`

const levelTypeMap: {
  [key: number]: string
} = {
  1: type1,
  2: type1,
  3: type3,
  4: type3,
  5: type5,
  6: type5,
  7: type5,
  8: type5,
  9: type5,
  10: type5,
}

const levelIconMap: {
  [key: string]: any
} = {
  type1: Level1Icon,
  type3: Level3Icon,
  type5: Level5Icon,
}

const LevelIcon = ({
  level,
  width,
  height
}: { 
  level: number;
  width: string;
  height: string;
}) => {

  const levelType = levelTypeMap[level]
  const levelIcon = levelIconMap[levelType]

  return (
    <LevelIconContainer>
      <img src={levelIcon} width={width} height={height}/>
      <LevelText levelType={levelType}>{level}</LevelText>
    </LevelIconContainer>
  )
}

export default LevelIcon