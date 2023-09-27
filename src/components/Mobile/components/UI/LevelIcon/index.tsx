import Level1Icon from "@/assets/images/bettingBonus/level_1.svg";
import Level3Icon from "@/assets/images/bettingBonus/level_3.svg";
import Level5Icon from "@/assets/images/bettingBonus/level_5.svg";
import styled from "styled-components";
import CurrentLevelTag from "@/assets/images/bettingBonus/current_level_tag.svg";

const type1 = "type1";
const type3 = "type3";
const type5 = "type5";

const iconBaseWidthHeight = 70;

const LevelIconContainer = styled.div`
  width: ${iconBaseWidthHeight}px;
  height: ${iconBaseWidthHeight}px;
  position: relative;
  transform: ${({ scale }: { scale: number }) => `scale(${scale})`};
  transform-origin: center;
  overflow: visible;
`;
const ImageIconWrapper = styled.div`
  width: ${iconBaseWidthHeight}px;
  height: ${iconBaseWidthHeight}px;
`;
const LevelText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ levelType }: { levelType: string }) => {
    switch (levelType) {
      case type1:
        return `translateX(-60%) translateY(-70%);`;
      case type3:
        return `translateX(-60%) translateY(-60%);`;
      case type5:
        return `translateX(-60%) translateY(-50%);`;
    }
  }};
  font-style: italic;
  color: #ffffff;
  font-size: 1.2rem;
  text-stroke: 2px #e5c0a2;
  font-weight: 900;
`;
const CurrentLevelTagWrapper = styled.div`
  width: ${iconBaseWidthHeight}px;
  position: absolute;
  top: 5px;
`;

const levelTypeMap: {
  [key: number]: string;
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
};

const levelIconMap: {
  [key: string]: any;
} = {
  type1: Level1Icon,
  type3: Level3Icon,
  type5: Level5Icon,
};

const LevelIcon = ({
  level,
  width,
  isCurrentLevel,
}: {
  level: number;
  width: string;
  isCurrentLevel: boolean;
}) => {
  const levelType = levelTypeMap[level];
  const levelIcon = levelIconMap[levelType];

  const scale = width ? parseInt(width) / iconBaseWidthHeight : 1;

  return (
    <>
      <LevelIconContainer scale={scale}>
        <ImageIconWrapper>
          <img src={levelIcon} width={"100%"} height={"100%"} />
        </ImageIconWrapper>
        <LevelText levelType={levelType}>{level}</LevelText>
      </LevelIconContainer>

      {isCurrentLevel && (
        <CurrentLevelTagWrapper>
          <img src={CurrentLevelTag} />
        </CurrentLevelTagWrapper>
      )}
    </>
  );
};

export default LevelIcon;
