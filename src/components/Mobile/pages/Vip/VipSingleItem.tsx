import bdcakeIcon from "@/assets/images/vip/bdcake.svg";
import calendarIcon from "@/assets/images/vip/calendar.svg";
import rocketIcon from "@/assets/images/vip/rocket.svg";
import uncompletedIcon from "@/assets/images/vip/uncompleted.svg";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import VipBonusStampGrid from "../../components/VipBonusStampGrid";

export type VipCardItem = any

type Props = {
  cardImage?: string,
  lineImage?: string,
  levelColor?: string,
  levelStatusColor?: string,
  bonusColor?: string,
  stampImage?: string,
  badgeImage?: string,
  privilegeTitleColor?: string,
  bonusTextColor?: string,
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
`;

const VipCard = styled.div<Props>`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 372px;
    min-height: 214px;
    background-image: url(${props => process.env.PUBLIC_URL + "/assets/images/vip/mobile" + props.cardImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    padding: 20px;
`;

const VipLine = styled.div<Props>`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 332px
    min-height: 8px;
    margin: 26px;
    background-image: url(${props => process.env.PUBLIC_URL + "/assets/images/vip/mobile" + props.lineImage});
    background-size: contain;
    background-repeat: no-repeat;
`;

const VipBonusText = styled.div<Props>`
    color: ${(props) => props.bonusColor};
`;

const VipPrivilegeContent = styled.div<Props>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px 10px 20px 10px;
    border-radius: 10px;
    background:  ${(props) => props.theme.primaryLight};
`;

const VipBadge = styled.div<Props>`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 98px
    min-height: 91px;
    margin: 17px 0;
    background-image: url(${props => process.env.PUBLIC_URL + "/assets/images/vip/mobile" + props.badgeImage});
    background-size: contain;
    background-repeat: no-repeat;
`;

const VipPrivilegeText = styled.div<Props>`
    color: ${(props) => props.privilegeTitleColor};
    margin-bottom: 17px;
`;

const VipPrivilegeItemWrapper = styled.div<Props>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
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

const LevelText = styled.div<Props>`
    color: ${(props) => props.levelColor};
    font-style: italic;
    font-weight: 700;
    font-size: min(max(2.5vw,1.25rem),2.25rem);
`;

const CurrentLevelText = styled.div<Props>`
    color: ${(props) => props.levelStatusColor};
    font-weight: 500;
`;

const LevelStatusTag = styled.div<Props>`
    display: flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 50px;
    background: rgba(0, 0, 0, 0.50);
    color: ${(props) => props.theme.white};
`;

type SingleCardProps = {
  vipCardItem: VipCardItem
  isCurrentLevel: boolean
}

const VipSingleItem = ({ vipCardItem: item, isCurrentLevel }: SingleCardProps) => {
  const currentItemRef = useRef<HTMLDivElement | null>(null);
  const {} = item;

  useEffect(() => {
    if (!isCurrentLevel) return;

    if (!(currentItemRef.current && 'scrollIntoView' in currentItemRef.current)) return;

    currentItemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  }, [currentItemRef.current, isCurrentLevel])

  return (
    <VipScrollableItem ref={currentItemRef}>
      <VipCard
        cardImage={item.levelStyle.cardImage}
      >
        <LevelText levelColor={item.levelStyle.levelColor}>{item.levelStyle.level}</LevelText>
        {isCurrentLevel ?
          <CurrentLevelText levelStatusColor={item.levelStyle.levelStatusColor}>Current level</CurrentLevelText>
          : <LevelStatusTag><img src={uncompletedIcon} alt="uncompleted" />Uncompleted</LevelStatusTag>
        }
        <VipBadge
          badgeImage={item.levelStyle.badgeImage}
        />
      </VipCard>

      <VipLine
        lineImage={item.levelStyle.lineImage}
      />
      <VipBonusText bonusColor={item.levelStyle.bonusColor}>VIP BONUS</VipBonusText>

      <VipBonusStampGrid
        stampImages={[item.levelStyle.stampImage, item.levelStyle.stampImage, item.levelStyle.stampImage]}
        bonusTextColor={item.levelStyle.bonusTextColor}
        bonusTextTitle={["PROMOTION", "BIRTHDAY", "QUARTERLY"]}
        iconUrl={[rocketIcon, bdcakeIcon, calendarIcon]}
        lockerIconColor={item.levelStyle.lockerIconColor}
        vipBonus={[item.promotionBenefit, item.birthBenefit, item.quarterlyBenefit]}
      />

      <VipPrivilegeContent>
        <VipBadge
          badgeImage={item.levelStyle.badgeImage}
        />
        <VipPrivilegeText privilegeTitleColor="#4C85F7">Level Up</VipPrivilegeText>
        <VipPrivilegeItemWrapper>
          <VipPrivilegeItem>
            <VipPrivilegeItemText>Deposit</VipPrivilegeItemText>
            <VipPrivilegeItemNumber>{item.levelUpAccumulateDeposit}/ Daily</VipPrivilegeItemNumber>
          </VipPrivilegeItem>
          <VipPrivilegeItem>
            <VipPrivilegeItemText>Betting</VipPrivilegeItemText>
            <VipPrivilegeItemNumber>{item.levelUpAccumulateBetAmount}/ Daily</VipPrivilegeItemNumber>
          </VipPrivilegeItem>
        </VipPrivilegeItemWrapper>
        <VipPrivilegeText privilegeTitleColor="#4C85F7">Level Protection</VipPrivilegeText>
        <VipPrivilegeItemWrapper>
          <VipPrivilegeItem>
            <VipPrivilegeItemText>Deposit</VipPrivilegeItemText>
            <VipPrivilegeItemNumber>{item.levelKeepAccumulateDeposit}/ Quarterly</VipPrivilegeItemNumber>
          </VipPrivilegeItem>
          <VipPrivilegeItem>
            <VipPrivilegeItemText>Betting</VipPrivilegeItemText>
            <VipPrivilegeItemNumber>{item.levelKeepAccumulateBetAmount}/ Quarterly</VipPrivilegeItemNumber>
          </VipPrivilegeItem>
        </VipPrivilegeItemWrapper>
      </VipPrivilegeContent>
    </VipScrollableItem>
  )
}

export default VipSingleItem;