import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@/models/dto/general/GetPromotionListResDto";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";

const PromotionCardContainer = styled.div`
  width: 100%;
  height: 128px;
  padding: 10px;
  border-radius: 10px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.primaryLight};
`;
const BannerWrapper = styled.div`
  width: 195px;
  height: 108px;
`;
const PromotionTextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100% - 195px);
`;
const TitleWrapper = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: #b2c3ec;
`;
const DescriptionWrapper = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 16px;
  height: 32px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const ClickMoreText = styled.div`
  position: absolute;
  bottom: 0;
  color: #6a768b;
  font-size: 0.875rem;
  font-weight: 400;
`;

const PromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
  const history = useHistory();

  const handleEnterDetail = () => {
    history.push("/promotion/" + promotionData.id);
  };

  return (
    <PromotionCardContainer onClick={handleEnterDetail}>
      <BannerWrapper>
        <BannerImage promotionData={promotionData} />
      </BannerWrapper>
      <PromotionTextContainer>
        <TitleWrapper>{promotionData.name}</TitleWrapper>
        <DescriptionWrapper>{promotionData.subSubject}</DescriptionWrapper>
        <ClickMoreText>{`Click for more >>`}</ClickMoreText>
      </PromotionTextContainer>
    </PromotionCardContainer>
  );
};

export default PromotionCard;
