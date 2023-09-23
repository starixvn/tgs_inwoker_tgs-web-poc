import lockedIcon from "@/assets/images/vip/locked.svg";
import rocketIcon from "@/assets/images/vip/rocket.svg";
import styled from "styled-components";

type Props = {
    cardImage?: string,
    lineImage?: string,
    levelColor?: string,
    bonusColor?: string,
    stampImage?: string,
    badgeImage?: string,
    privilegeTitleColor?: string,
    iconUrl?: string,
    bonusTextColor?: string,
};

const VipScrollableContainer = styled.div`
    width: 100%;
    height: 300px;
    min-height: 100vh;
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    padding: 20px;
    background-color: ${(props: { theme: { primaryDark: any; }; }) => props.theme.primaryDark};
    color: ${(props: { theme: { white: any; }; }) => props.theme.white};
`;

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

const VipBonusContent = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
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

const VipBonusStamp = styled.div<Props>`
    padding: 9px 7px;
    min-height: 156px;
`;

const VipBonusStampAbove = styled.div<Props>`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    font-size: 2.25rem;
    line-height: 1.5rem;
`;

const LevelStatusText = styled.div<Props>`
    color: ${(props) => props.levelColor};
    font-weight: 500;
`;

const VipBonusStampTitle = styled.div<Props>`
    color: ${(props) => props.bonusTextColor};
    font-weight: 400;
    line-height: 1.125rem;
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

const VIP = () => {
    return (
        <VipScrollableContainer>
            <VipScrollableItem>
                <VipCard
                    cardImage={"/card/level_0.png"}
                >
                    <LevelText levelColor="#643E13">V1</LevelText>
                    <LevelStatusText levelColor="#6C4921">Current level</LevelStatusText>
                    <VipBadge
                        badgeImage={"/badge/level_0.png"}
                    />
                </VipCard>

                <VipLine
                    lineImage={"/line/level_0.png"}
                />
                <VipBonusText bonusColor="#C49586">VIP BONUS</VipBonusText>
                <VipBonusContent>
                    <VipBonusStampContainer
                        stampImage={"/stamp/level_0.png"}
                    >
                        <VipBonusStamp>
                            <VipBonusStampAbove>
                                <VipBonusStampTitle bonusTextColor="#6E491F">PROMOTION</VipBonusStampTitle>
                                <VipBonusStampTitle bonusTextColor="#6E491F">BONUS</VipBonusStampTitle>
                                <BonusIcon iconUrl={rocketIcon}></BonusIcon>
                                <VipBonusStampNumber bonusTextColor="#6E491F">0</VipBonusStampNumber>
                            </VipBonusStampAbove>
                        </VipBonusStamp>
                        <VipBonusStampBelow><LockerIcon iconUrl={lockedIcon}></LockerIcon></VipBonusStampBelow>
                    </VipBonusStampContainer>
                </VipBonusContent>

                <VipPrivilegeContent>
                    <VipBadge
                        badgeImage={"/badge/level_0.png"}
                    />
                    <VipPrivilegeText privilegeTitleColor="#4C85F7">Member Privilege</VipPrivilegeText>
                    <VipPrivilegeItemWrapper>
                        <VipPrivilegeItem>
                            <VipPrivilegeItemText>Live Dealer Rebate</VipPrivilegeItemText>
                            <VipPrivilegeItemNumber>3.00%</VipPrivilegeItemNumber>
                        </VipPrivilegeItem>
                    </VipPrivilegeItemWrapper>
                    <VipPrivilegeText privilegeTitleColor="#4C85F7">Level protection</VipPrivilegeText>
                    <VipPrivilegeItemWrapper>
                        <VipPrivilegeItem>
                            <VipPrivilegeItemText>Deposit</VipPrivilegeItemText>
                            <VipPrivilegeItemNumber>R$20/Quarterly</VipPrivilegeItemNumber>
                        </VipPrivilegeItem>
                        <VipPrivilegeItem>
                            <VipPrivilegeItemText>Betting</VipPrivilegeItemText>
                            <VipPrivilegeItemNumber>R$20/Quarterly</VipPrivilegeItemNumber>
                        </VipPrivilegeItem>
                    </VipPrivilegeItemWrapper>
                </VipPrivilegeContent>
            </VipScrollableItem>
        </VipScrollableContainer >

    )
}

export default VIP