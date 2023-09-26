import styled from "styled-components"
import PromotionCard from "@/components/Mobile/components/Promotion/PromotionCard"
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { Promotion as TypePromotion } from "@/models/dto/general/GetPromotionListResDto";

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
  const {
    general: {
    promotionList: {items=[]}}
  } = useGeneralStore();

  const isEmpty = items.length === 0;

  const promotionListByOrder = items.sort((a: TypePromotion, b: TypePromotion) => a.order - b.order);

  return (
    <PromotionContainer>
      <TitleText>Promotions</TitleText>
      <PromotionCardListContainer>
        {isEmpty && <div>Empty</div>}
        {!isEmpty && (
          promotionListByOrder.map((promotionData: TypePromotion) => 
            <PromotionCard key={promotionData.id} promotionData={promotionData} />
          )
        )}
      </PromotionCardListContainer>
    </PromotionContainer>
  )
}

export default Promotion