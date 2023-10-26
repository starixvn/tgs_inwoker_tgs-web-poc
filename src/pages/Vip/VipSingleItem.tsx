import bdcakeIcon from "@/assets/t18/images/vip/bdcake.svg";
import calendarIcon from "@/assets/t18/images/vip/calendar.svg";
import rocketIcon from "@/assets/t18/images/vip/rocket.svg";
import uncompletedIcon from "@/assets/t18/images/vip/uncompleted.svg";
import VipBonusStampGrid from "@/components/VipBonusStampGrid";
import { media } from "@/theme/breakpoints";
import formatAmount from "@/utils/getFormatAmount";
import { useEffect, useRef } from "react";
import styled from "styled-components";

export type VipCardItem = any;

type Props = {
  cardImage?: string;
  lineImage?: string;
  levelColor?: string;
  levelStatusColor?: string;
  bonusColor?: string;
  stampImage?: string;
  badgeImage?: string;
  privilegeTitleColor?: string;
  bonusTextColor?: string;
};

const VipScrollableItem = styled.div`
  flex: 0 0 100%;
  height: 100%;
  scroll-snap-align: start;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-right: 20px;

  ${media.sm} {
    width: 100%;
  }
`;

type VipCardProps = {
  $cardImage: string;
};
const VipCard = styled.div<VipCardProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 372px;
  min-height: 214px;
  background-image: url(${(props: VipCardProps) =>
    process.env.PUBLIC_URL + "/assets/images/vip/mobile" + props.$cardImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  padding: 20px;

  ${media.sm} {
    background-size: 100% 100%;
    max-width: 100%;
    padding: 0 93px;
    border-radius: 20px;
  }
`;

const VipCardLevelText = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  ${media.sm} {
    justify-content: unset;
  }
`;

type VipLineProps = {
  $lineImage: string;
};
const VipLine = styled.div<VipLineProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 332px;
  min-height: 8px;
  margin: 26px;
  background-image: url(${(props: VipLineProps) =>
    process.env.PUBLIC_URL + "/assets/images/vip/mobile" + props.$lineImage});
  background-size: contain;
  background-repeat: no-repeat;
`;

type VipBonusTextProps = {
  $bonusColor: string;
};
const VipBonusText = styled.div<VipBonusTextProps>`
  color: ${(props: VipBonusTextProps) => props.$bonusColor};
`;

const VipPrivilegeContent = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 10px 20px 10px;
  border-radius: 10px;
  background: ${(props) => props.theme.primaryLight};
  gap: 17px;
  align-self: stretch;
`;

type VipBadgeProps = {
  $badgeImage: string;
};
const VipBadge = styled.div<VipBadgeProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 98px;
  min-height: 91px;
  background-image: url(${(props: VipBadgeProps) =>
    process.env.PUBLIC_URL + "/assets/images/vip/mobile" + props.$badgeImage});
  background-size: contain;
  background-repeat: no-repeat;
`;

type VipPrivilegeTextProps = {
  $privilegeTitleColor: string;
};
const VipPrivilegeText = styled.div<VipPrivilegeTextProps>`
  color: ${(props: VipPrivilegeTextProps) => props.$privilegeTitleColor};
`;

const VipPrivilegeItemWrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const VipPrivilegeItem = styled.div<Props>`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 5px;
`;

const VipPrivilegeItemText = styled.div<Props>`
  color: ${(props) => props.theme.tertiaryLight};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.125rem;
`;

const VipPrivilegeItemNumber = styled.div<Props>`
  color: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.125rem;
  margin-left: 8px;
`;

type LevelTextTypes = {
  $levelColor: string;
};
const LevelText = styled.div<LevelTextTypes>`
  color: ${({ $levelColor }: LevelTextTypes) => $levelColor};
  font-style: italic;
  font-weight: 700;
  font-size: 2.2rem;

  ${media.sm} {
    margin-right: 30px;
    font-size: 2rem;
  }
`;

type CurrentLevelTextTypes = {
  $levelStatusColor: string;
};
const CurrentLevelText = styled.div<CurrentLevelTextTypes>`
  color: ${({ $levelStatusColor }: CurrentLevelTextTypes) => $levelStatusColor};
  font-weight: 500;
  font-size: 1rem;

  ${media.sm} {
    font-size: 1.5rem;
  }
`;

const LevelStatusTag = styled.div<Props>`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.white};
  font-size: 0.875rem;
`;

type SingleCardProps = {
  vipCardItem: VipCardItem;
  isCurrentLevel: boolean;
};

const VipSingleItem = ({
  vipCardItem: item,
  isCurrentLevel,
}: SingleCardProps) => {
  const currentItemRef = useRef<HTMLDivElement | null>(null);
  const {} = item;

  useEffect(() => {
    if (!isCurrentLevel) return;

    if (!currentItemRef.current) return;
  }, [currentItemRef.current, isCurrentLevel]);

  return (
    <VipScrollableItem ref={currentItemRef}>
      <VipCard $cardImage={item.levelStyle.cardImage}>
        <VipCardLevelText>
          <LevelText $levelColor={item.levelStyle.levelColor}>
            {item.levelStyle.level}
          </LevelText>
          {isCurrentLevel ? (
            <CurrentLevelText
              $levelStatusColor={item.levelStyle.levelStatusColor}
            >
              Current level
            </CurrentLevelText>
          ) : (
            <LevelStatusTag>
              <img src={uncompletedIcon} alt="uncompleted" />
              Uncompleted
            </LevelStatusTag>
          )}
        </VipCardLevelText>

        <VipBadge $badgeImage={item.levelStyle.badgeImage} />
      </VipCard>

      <VipLine $lineImage={item.levelStyle.lineImage} />
      <VipBonusText $bonusColor={item.levelStyle.bonusColor}>
        VIP BONUS
      </VipBonusText>

      <VipBonusStampGrid
        stampImages={[
          item.levelStyle.stampImage,
          item.levelStyle.stampImage,
          item.levelStyle.stampImage,
        ]}
        bonusTextColor={item.levelStyle.bonusTextColor}
        bonusTextTitle={["PROMOTION", "BIRTHDAY", "QUARTERLY"]}
        iconUrl={[rocketIcon, bdcakeIcon, calendarIcon]}
        lockerIconColor={item.levelStyle.lockerIconColor}
        vipBonus={[
          item.promotionBenefit,
          item.birthBenefit,
          item.quarterlyBenefit,
        ]}
      />

      <VipPrivilegeContent>
        <VipBadge $badgeImage={item.levelStyle.badgeImage} />
        <VipPrivilegeText $privilegeTitleColor="#4C85F7">
          Level Up
        </VipPrivilegeText>
        <VipPrivilegeItemWrapper>
          <VipPrivilegeItem>
            <VipPrivilegeItemText>Deposit</VipPrivilegeItemText>
            <VipPrivilegeItemNumber>
              {formatAmount(item.levelUpAccumulateDeposit)}/ Daily
            </VipPrivilegeItemNumber>
          </VipPrivilegeItem>
          <VipPrivilegeItem>
            <VipPrivilegeItemText>Betting</VipPrivilegeItemText>
            <VipPrivilegeItemNumber>
              {formatAmount(item.levelUpAccumulateBetAmount)}/ Daily
            </VipPrivilegeItemNumber>
          </VipPrivilegeItem>
        </VipPrivilegeItemWrapper>
        <VipPrivilegeText $privilegeTitleColor="#4C85F7">
          Level Protection
        </VipPrivilegeText>
        <VipPrivilegeItemWrapper>
          <VipPrivilegeItem>
            <VipPrivilegeItemText>Deposit</VipPrivilegeItemText>
            <VipPrivilegeItemNumber>
              {formatAmount(item.levelKeepAccumulateDeposit)}/ Quarterly
            </VipPrivilegeItemNumber>
          </VipPrivilegeItem>
          <VipPrivilegeItem>
            <VipPrivilegeItemText>Betting</VipPrivilegeItemText>
            <VipPrivilegeItemNumber>
              {formatAmount(item.levelKeepAccumulateBetAmount)}/ Quarterly
            </VipPrivilegeItemNumber>
          </VipPrivilegeItem>
        </VipPrivilegeItemWrapper>
      </VipPrivilegeContent>
    </VipScrollableItem>
  );
};

export default VipSingleItem;
