import styled from "styled-components"
import PromotionCard from "@/components/Mobile/components/Promotion/PromotionCard"

export type TypePromotionData = {
  id: string;
  mobileBanner: string;
  order: number;
  from: string;
  to: string;
  name: string;
  campaignDetail: string; 
  content: string;
  subSubject: string;
  terms: string;
}

const PromotionContainer = styled.div`
  padding: 22px 20px;
`;

const PromotionCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 30px 0;
`;

const TitleText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #FFFFFF;
`;

const Promotion = () => {
  // TODO: fake promotion list
  const promotionList = [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      name: "Promotion 1",
      mobileBanner: "/assets/images/mobile/promotion/mock_banner.png",
      order: 0,
      from: "2023-09-19T02:42:01.908Z",
      to: "2023-09-19T02:42:01.908Z",
      terms: 'promotion terms promotion terms promotion terms',
      campaignDetail: "campaignDetail", // TODO: check layout position
      content: "content", // TODO: check layout position
      subSubject: `(Announcement Content)Please be informed that Virtual
      Sports ` // TODO: check layout position
    },  
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66af87",
      name: "Promotion 2",
      mobileBanner: "/assets/images/mobile/promotion/mock_banner.png",
      order: 1,
      from: "2023-09-19T02:42:01.908Z",
      to: "2023-09-19T02:42:01.908Z",
      terms: 'promotion terms promotion terms promotion terms',
      campaignDetail: "campaignDetail",
      content: "content",
      subSubject: "subSubject"
    },
  ]

  return (
    <PromotionContainer>
      <TitleText>Promotions</TitleText>
      <PromotionCardListContainer>
        {promotionList.map((promotionData: TypePromotionData) => 
            <PromotionCard key={promotionData.id} promotionData={promotionData} />
          )
        }
      </PromotionCardListContainer>
    </PromotionContainer>
  )
}

export default Promotion