import styled from "styled-components"
import { LevelList } from "@/components/Mobile/pages/BettingBonus"
import LevelIcon from "@/components/Mobile/components/UI/LevelIcon"

const LevelTableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0 10px;
`
const Header = styled.thead`
`
const HeaderItem = styled.th`
  color: #6A768B;
  font-size: 0.875rem;
`
const LevelHeaderItem = styled(HeaderItem)`
  width: 70px;
`
const Row = styled.tr`
  color: #B2C3EC;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  position: relative;
  width: 100%;
  height: 67px;
  background-color: #181F2B;

  td:first-child{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  td:last-child{
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

const maxLevel = 10;
const levelList = Array.from({length: maxLevel}).map((level, index: number) => index + 1)

export const LevelTableRow = ({
  level,
  bonusList
}: {
  level: number;
  bonusList: string[];
}) => {
  return (
    <Row>
      <td>
        <LevelIcon level={level} width={"57px"} />
      </td>
        {
          bonusList.map(bonus => {
            return (
              <td>{bonus}</td>
            )
          })
        }
    </Row>
  )
}

const LevelTable = ({
  currentLevelListByGame
}: {
  currentLevelListByGame: LevelList[]
}) => {
  const gameList = currentLevelListByGame.map((game) => game.name)

  const getLevelList = (level: number) => {
    const levelText = `level${level}` as keyof LevelList
    return currentLevelListByGame.map((game) => game[levelText] || '')
  }

  return (
    <LevelTableContainer>
      <Header>
        <tr>
          <LevelHeaderItem>Level</LevelHeaderItem>
          {
            gameList.map(game => (
              <HeaderItem>{game}</HeaderItem>
            ))
          }
        </tr>
      </Header>
      <tbody>
        {
          levelList.map((level) => {
            return <LevelTableRow level={level} bonusList={getLevelList(level)}/>
          })
        }
      </tbody>
    </LevelTableContainer>
  )
}

export default LevelTable