import styled from "styled-components";

type Props = {
  bonusColor?: string,
  stampImage?: string,
  badgeImage?: string,
  privilegeTitleColor?: string,
  iconUrl?: string,
  bonusTextColor?: string,
};

const VipBonusStampGridContainer = styled.div<Props>`
    display: flex;
    justify-content: space-between;
    margin: 26px 0;
    gap: 15px;
`;

const VipBonusStampContainer = styled.div<Props>`
    width: 100%;
    max-width: 112px
    min-height: 156px;
    background-image: url(${props => process.env.PUBLIC_URL + "/assets/images/vip/mobile" + props.stampImage});
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
`;

const VipBonusStampTitle = styled.div<Props>`
    color: ${(props) => props.bonusTextColor};
    font-weight: 400;
    line-height: 1.125rem;
`;

const VipBonusStamp = styled.div<Props>`
    padding: 9px 7px;

    @media (max-width: 400px) {
      padding: 6px 5px;
    }
`;

const VipBonusStampAbove = styled.div<Props>`
border: 1px solid #fff;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const VipBonusStampBelow = styled.div<Props>`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
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
`;

const LockerIcon = styled.div<Props>`
    width: 20px
    height: 20px;
    background-image: url(${props => props.iconUrl});
    background-size: contain;
    background-repeat: no-repeat;
`;

const VipBonusStampGrid = ({ stampImages, bonusTextColors, bonusTextTitle, iconUrl }) => {
  console.log(stampImages, bonusTextColors, bonusTextTitle, iconUrl)
  return (
    <VipBonusStampGridContainer>
      {stampImages.map((stampImage: string, index: number) => (

        <VipBonusStampContainer
          key={index}
          stampImage={stampImage}
          bonusTextColor={bonusTextColors[index]}
        >
          <VipBonusStamp>
            <VipBonusStampAbove>
              <VipBonusStampTitle bonusTextColor={bonusTextColor}>PROMOTION</VipBonusStampTitle>
              <VipBonusStampTitle bonusTextColor={bonusTextColor}>BONUS</VipBonusStampTitle>
              <BonusIcon iconUrl={rocketIcon}></BonusIcon>
              <VipBonusStampNumber bonusTextColor={bonusTextColor}>0</VipBonusStampNumber>
            </VipBonusStampAbove>
          </VipBonusStamp>
          <VipBonusStampBelow><LockerSvgIcon color={lockerIconColor}></LockerSvgIcon></VipBonusStampBelow>
        </VipBonusStampContainer>
      ))}
    </VipBonusStampGridContainer>
  );
};

export default VipBonusStampGrid;