import { media } from "@/theme/breakpoints";
import formatAmount from "@/utils/getFormatAmount";
import styled from "styled-components";

type Props = {
  bonusColor?: string;
  stampImages?: string[];
  stampImage?: string;
  badgeImage?: string;
  privilegeTitleColor?: string;
  iconUrl?: string[];
  bonusTextColor?: string;
  bonusTextTitle?: string[];
  lockerIconColor?: string;
  vipBonus?: number[];
};

const VipBonusStampGridContainer = styled.div<Props>`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  margin: 26px 0;
  gap: 15px;

  ${media.sm} {
    margin: 20px 0;
  }
`;

const VipBonusStampContainer = styled.div<Props>`
  flex 1;
  width: 100%;
  max-width: 112px;
  min-height: 156px;
  position: relative;

  @media (max-width: 400px) {
    max-width: 95.2px;
    min-height: 132.6px;
  }

  ${media.sm} {
    max-width: 259px;
  }
`;

type VipBonusStampAboveProps = {
  $stampImage: string;
  $bonusTextColor?: string | undefined;
};
const VipBonusStampAbove = styled.div<VipBonusStampAboveProps>`
  background-image: url(${(props: VipBonusStampAboveProps) =>
    process.env.PUBLIC_URL + "/assets/images/vip/mobile" + props.$stampImage});
  background-size: 100% auto;
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

  ${media.sm} {
    background-size: 100% 100%;
  }
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
const VipBonusStampTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.sm} {
    flex-direction: row;
  }
`;

type VipBonusStampTitleProps = {
  $bonusTextColor?: string | undefined;
};
const VipBonusStampTitle = styled.div<VipBonusStampTitleProps>`
  color: ${(props: VipBonusStampTitleProps) => props.$bonusTextColor};
  font-weight: 400;
  line-height: 1.125rem;
  font-size: 1.0625rem;
  margin-right: 5px;
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

type VipBonusStampNumberProps = {
  $bonusTextColor?: string | undefined;
};
const VipBonusStampNumber = styled.div<VipBonusStampNumberProps>`
  color: ${(props: VipBonusStampNumberProps) => props.$bonusTextColor};
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.125rem;
`;

type BonusIconTypes = {
  $iconUrl?: string | undefined;
};
const BonusIcon = styled.div<BonusIconTypes>`
  display: inline-flex;
  width: 100%;
  max-width: 32px;
  min-height: 32px;
  margin: 7px 0;
  background-image: url(${(props: BonusIconTypes) => props.$iconUrl});
  background-size: contain;
  background-repeat: no-repeat;
  @media (max-width: 414px) {
    margin: 4px 0;
  }
  ${media.sm} {
    margin: 10px 0;
  }
`;

const VipBonusStampGrid = ({
  stampImages,
  bonusTextColor,
  bonusTextTitle,
  iconUrl,
  vipBonus,
}: Props) => {
  return (
    <VipBonusStampGridContainer>
      {stampImages &&
        stampImages.map((stampImage: string, index: number) => (
          <VipBonusStampContainer key={index}>
            <VipBonusStampAbove
              $stampImage={stampImage}
              $bonusTextColor={bonusTextColor && bonusTextColor[index]}
            >
              <VipBonusStampTitleWrapper>
                <VipBonusStampTitle $bonusTextColor={bonusTextColor}>
                  {bonusTextTitle && bonusTextTitle[index]}
                </VipBonusStampTitle>
                <VipBonusStampTitle $bonusTextColor={bonusTextColor}>
                  BONUS
                </VipBonusStampTitle>
              </VipBonusStampTitleWrapper>
              <BonusIcon
                $iconUrl={iconUrl ? iconUrl[index] : undefined}
              ></BonusIcon>

              <VipBonusStampNumber $bonusTextColor={bonusTextColor}>
                {vipBonus && formatAmount(vipBonus[index])}
              </VipBonusStampNumber>
            </VipBonusStampAbove>
          </VipBonusStampContainer>
        ))}
    </VipBonusStampGridContainer>
  );
};

export default VipBonusStampGrid;
