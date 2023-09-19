import styled from 'styled-components'
import { TypePromotionData } from '@/components/Mobile/pages/Promotion'
import { themeList } from "@/theme";
import { AppHistory } from "@/history/History";

const theme = themeList["mobileT18"];

const PromotionCardContainer = styled.div`
  width: 387px;
  height: 142px;
  padding: 10px;
  border-radius: 10px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  background: ${theme.primaryLight};
`
const BannerWrapper = styled.div`
  width: 195px
  height: 122px
`
const PromotionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100% - 195px);
`
const TitleWrapper = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: #B2C3EC;
`
const DescriptionWrapper = styled.p`
  font-size: .875rem;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 16px;
  height: 64px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`
const ClickMoreText = styled.div`
  color: #6A768B;
  font-size: .875rem;
  font-weight: 400;
`

const PromotionCard = ({ promotionData }: {
  promotionData: TypePromotionData
}) => {
  
  const handleEnterDetail = () => {
    AppHistory.replace({
      pathname: "/promotion/" + promotionData.id,
    });
  }

  return (
    <PromotionCardContainer onClick={handleEnterDetail}>
      <BannerWrapper>
        <img src={promotionData.mobileBanner} alt="banner" width={"100%"} height={"100%"}/>
      </BannerWrapper>
      <PromotionTextContainer>
        <TitleWrapper>
          {promotionData.name}
        </TitleWrapper>
        <DescriptionWrapper>
          {promotionData.subSubject}
        </DescriptionWrapper>
        <ClickMoreText>
          {`Click for more >>`}
        </ClickMoreText>
      </PromotionTextContainer>
    </PromotionCardContainer>
  )
}

export default PromotionCard