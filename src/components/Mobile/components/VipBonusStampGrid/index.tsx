import styled from "styled-components";
import LockerSvgIcon from "../LockerSvgIcon";

type Props = {
  bonusColor?: string,
  stampImages?: string[],
  stampImage?: string,
  badgeImage?: string,
  privilegeTitleColor?: string,
  iconUrl?: string[],
  bonusTextColor?: string,
  bonusTextTitle?: string[],
  lockerIconColor?: string,
  vipBonus?: string[],
};

const VipBonusStampGridContainer = styled.div<Props>`
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    width: 100%;
    margin: 26px 0;
    gap: 15px;
`;

const VipBonusStampContainer = styled.div<Props>`
    flex 1;
    max-width: 112px
    min-height: 156px;
    position: relative;

    @media (max-width: 400px) {
      max-width: 95.2px
      min-height: 132.6px;
    }
`;

const VipBonusStampAbove = styled.div<Props>`
    background-image: url(${props => process.env.PUBLIC_URL + "/assets/images/vip/mobile" + props.stampImage});
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 9px 7px;
`;

const VipBonusStampBelow = styled.div<Props>`
    width: 100%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const VipBonusStampTitle = styled.div<Props>`
    color: ${(props) => props.bonusTextColor};
    font-weight: 400;
    line-height: 1.125rem;
    font-size: 1.0625rem;
    @media (max-width: 414px) {
      padding: 5px;
      line-height: 0.625rem;
      font-size: 0.875rem;
    }

    @media (max-width: 400px) {
      padding: 3px;
      line-height: 0.5rem;
    }
`;

const VipBonusStampNumber = styled.div<Props>`
    color: ${(props) => props.bonusTextColor};
    font-weight: 700;
    font-size: 1.125rem;
    line-height: 1.125rem;
`;

const BonusIcon = styled.div<Props>`
    display: inline-flex;
    width: 100%;
    max-width: 32px
    min-height: 32px;
    margin: 7px 0;
    background-image: url(${props => props.iconUrl});
    background-size: contain;
    background-repeat: no-repeat;
    @media (max-width: 414px) {
      margin: 4px 0;
    }
`;

const LockerIcon = styled.div<Props>`
    width: 20px
    height: 20px;
    background-image: url(${props => props.iconUrl});
    background-size: contain;
    background-repeat: no-repeat;
`;

const VipBonusStampGrid = ({
  stampImages,
  bonusTextColor,
  bonusTextTitle,
  iconUrl,
  lockerIconColor,
  vipBonus
}: Props) => {
  return (
    <VipBonusStampGridContainer>
      {stampImages && stampImages.map((stampImage: string, index: number) => (
        <VipBonusStampContainer
          key={index}
        >
          <VipBonusStampAbove
            stampImage={stampImage}
            bonusTextColor={bonusTextColor && bonusTextColor[index]}

          >
            <VipBonusStampTitle bonusTextColor={bonusTextColor}>{bonusTextTitle && bonusTextTitle[index]}</VipBonusStampTitle>
            <VipBonusStampTitle bonusTextColor={bonusTextColor}>BONUS</VipBonusStampTitle>
            <BonusIcon iconUrl={iconUrl && iconUrl[index]}></BonusIcon>
            <VipBonusStampNumber bonusTextColor={bonusTextColor}>{vipBonus && vipBonus[index]}</VipBonusStampNumber>
          </VipBonusStampAbove>
          <VipBonusStampBelow><LockerSvgIcon color={lockerIconColor}></LockerSvgIcon></VipBonusStampBelow>
        </VipBonusStampContainer>
      ))}
    </VipBonusStampGridContainer>
  );
};

export default VipBonusStampGrid;