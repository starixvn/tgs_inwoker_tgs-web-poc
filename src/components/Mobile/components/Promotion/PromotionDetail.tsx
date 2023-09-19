import styled from 'styled-components'
import { TypePromotionData } from '@/components/Mobile/pages/Promotion'
import { themeList } from "@/theme";
import JoinPromotionButton from './JoinPromotionButton';
const moment = require("moment");

const theme = themeList["mobileT18"];

const PromotionDetailContainer = styled.div`
  width: 100%;
  padding: 22px;
  color: #ffffff;
`
const BannerWrapper = styled.div`
  width: 100%;
  height: 219px;
`
const ContentContainer = styled.div`
  margin: 20px 0;
`

const TextArea = styled.div`
  line-height: 1rem;
  margin-bottom: 40px;
`

const Title = styled.h2`
  color: #F3DE4B;
  font-size: 1.125rem;
  font-weight: 700;
`

const Description = styled.p`
  color: #FFFFFF;
  font-size: .875rem;
  font-weight: 500;
`
const JoinPromotionButtonWrapper = styled.div`
  position: fixed;
  bottom: 82px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background: ${theme.primaryLight};
`

const PromotionDetail = () => {
  // TODO: fake promotion data
  const promotionData: TypePromotionData = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Promotion 1",
    mobileBanner: "/assets/images/mobile/promotion/mock_banner.png",
    order: 0,
    from: "2023-09-19T02:42:01.908Z",
    to: "2023-09-19T02:42:01.908Z",
    terms: `1. Each player has two balances – the real balance and the bonus balance. The player’s real balance will be used first in the game.
    2. The available bonuses for a particular player will be displayed in the “My bonuses” section of their profile. If a bonus is not available to the player, it will not be displayed in their profile.
    3. All cash bonuses and gifted free spins are available to wager within 5 days from the date of receipt. If the bonuses have not been wagered after this period, they will be automatically voided. The exception is those bonuses with conditions that indicate a validity period.
    4. After bonus wagering conditions are met, the bonus balance amount will be automatically converted to the real balance at the time of wagering the bonus, but no more than specified in the bonus conditions.
    5. The player only starts playing with bonus funds when the amount in their real account is at zero.
    6. All the winnings received when playing with bonus money will be credited to the player’s bonus balance.
    7. Some game providers may not be available in a particular jurisdiction. If the free spins that you received from any promotion are not available in your region, please contact the Support Service to replace the free spins.
    8. The bonuses issued for the casino cannot be wagered in Insta games or Live casinos or used for sports bets.
    9. In the “Poker”, “Roulettes” and “Table Games” sections, 15% of bets placed count towards the wagering requirement. For Slots, 100% of the bets count.`,
    campaignDetail: "campaignDetail", // TODO: check layout position
    content: "content", // TODO: check layout position
    subSubject: `(Announcement Content)Please be informed that Virtual
    Sports ` // TODO: check layout position
  }

  return (
    <>
      <PromotionDetailContainer>
        <BannerWrapper>
          <img src={promotionData.mobileBanner} alt="promotion banner" width={"100%"} height={"100%"}/>
        </BannerWrapper>
        <ContentContainer>
          <TextArea>
            <Title>{promotionData.name}</Title>
            <Description>{promotionData.campaignDetail}</Description>
          </TextArea>
          <TextArea>
            <Title>Promo Period</Title>
            <Description>
              {moment(promotionData.from).format("YYYY/MM/DD HH:mm:ss")} - {moment(promotionData.to).format("YYYY/MM/DD HH:mm:ss")}
            </Description>
          </TextArea>
          <TextArea>
            <Title>Terms & Conditions</Title>
            <Description>{promotionData.terms}</Description>
          </TextArea>
        </ContentContainer>
      </PromotionDetailContainer>
      <JoinPromotionButtonWrapper>
        <JoinPromotionButton/>
      </JoinPromotionButtonWrapper>
    </>
  )
}

export default PromotionDetail