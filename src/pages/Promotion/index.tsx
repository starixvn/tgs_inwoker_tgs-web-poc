import styled from "styled-components";
import PromotionCard from "@/components/Promotion/PromotionCard";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { Promotion as TypePromotion } from "@/models/dto/general/GetPromotionListResDto";
import EmptyPage from "@/components/Promotion/EmptyPage";
import { media } from "@/theme/breakpoints";

const PromotionContainer = styled.div`
  padding: 22px 20px;
  ${media.sm} {
    max-width: 870px;
    margin: 0 auto;
  }
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
  color: #ffffff;
`;

const Promotion = () => {
  const {
    general: {
      promotionList: { items = [] },
    },
  } = useGeneralStore();

  const isEmpty = items.length === 0;

  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PromotionContainer>
      <TitleText>Promotions</TitleText>
      <PromotionCardListContainer>
        {items
          .sort((a: TypePromotion, b: TypePromotion) => a.order - b.order)
          .map((promotionData: TypePromotion) => (
            <PromotionCard
              key={promotionData.id}
              promotionData={promotionData}
            />
          ))}
      </PromotionCardListContainer>
    </PromotionContainer>
  );
};

export default Promotion;
