import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@/models/dto/general/GetPromotionListResDto";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";
import { Button } from "@/components/Mobile/components/UI/Button";
import { useRwd } from "@/hooks/useRwd";
import { useTheme } from "styled-components";

const PromotionCardContainer = styled.div`
  width: 100%;
  height: 128px;
  padding: 10px;
  border-radius: 10px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.primaryLight};
  ${media.sm} {
    height: 220px;
    padding: 0;
  }
`;
const BannerWrapper = styled.div`
  width: 195px;
  height: 108px;
  ${media.sm} {
    width: 540px;
    height: 100%;
  }
`;
const PromotionTextContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100% - 195px);
  ${media.sm} {
    width: 272px;
    height: 100%;
    padding: 5px 10px;
  }
`;
const TitleWrapper = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.tertiaryLight};
  ${media.sm} {
    color: ${({ theme }) => theme.yellow};
  }
`;
const DescriptionWrapper = styled.p`
  font-size: 0.875rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white}};
  line-height: 16px;
  height: 32px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  ${media.sm} {
    color: ${({ theme }) => theme.tertiaryLight};
  }
`;
const ClickMoreText = styled.div`
  position: absolute;
  bottom: 0;
  color: #6a768b;
  font-size: 0.875rem;
  font-weight: 400;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 10px);
  height: 53px;
`;

const PromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
  const history = useHistory();
  const { isMobileSize, isDesktopSize } = useRwd();
  const theme = useTheme();

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
        {isMobileSize && <ClickMoreText>{`Click for more >>`}</ClickMoreText>}
        {isDesktopSize && (
          <ButtonWrapper>
            <Button
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: theme.primary,
                color: theme.white,
              }}
            >
              More
            </Button>
          </ButtonWrapper>
        )}
      </PromotionTextContainer>
    </PromotionCardContainer>
  );
};

export default PromotionCard;
