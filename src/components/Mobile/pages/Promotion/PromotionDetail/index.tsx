import styled from "styled-components";
import { themeList } from "@/theme";
import { useGeneralStore } from "@/hooks/stores/useGeneralStore";
import { Promotion } from "@/models/dto/general/GetPromotionListResDto";
import JoinPromotionButton from "../../../components/Promotion/JoinPromotionButton";
import BannerImage from "../../../components/Promotion/BannerImage";
import i18n from "@/utils/i18n";
import { NOT_SHOW_JOIN_BUTTON_KEY_LIST } from "@/components/Mobile/constants/promotion";
const moment = require("moment");

const theme = themeList["mobileT18"];

const PromotionDetailContainer = styled.div`
  width: 100%;
  padding: 22px;
  color: #ffffff;
`;
const BannerWrapper = styled.div`
  width: 100%;
  height: 219px;
`;
const ContentContainer = styled.div`
  margin: 20px 0;
`;
const TextArea = styled.div`
  line-height: 1rem;
  margin-bottom: 40px;
`;
const Title = styled.h2`
  color: #f3de4b;
  font-size: 1.125rem;
  font-weight: 700;
`;
const Description = styled.p`
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
`;
const JoinPromotionButtonWrapper = styled.div`
  position: fixed;
  bottom: 82px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background: ${theme.primaryLight};
`;

const PromotionDetail = () => {
  const {
    general: {
      promotionList: { items = [] },
    },
  } = useGeneralStore();

  const targetPromotionId = window.location.pathname.split("/")[2]; // TODO: 確定取得方法

  const promotionData = items.find(
    (item: Promotion) => item.id === targetPromotionId
  ) as Promotion;

  if (!promotionData || Object.keys(promotionData).length === 0) return null;

  const isLocalizationHasData =
    Object.keys(promotionData.localization).length > 0;

  const contentToDisplay =
    (isLocalizationHasData &&
      promotionData.localization[i18n.language].content) ||
    promotionData.content ||
    "";

  const termsToDisplay =
    (isLocalizationHasData &&
      promotionData.localization[i18n.language].terms) ||
    promotionData.terms ||
    "";

  const showJoinButton = !NOT_SHOW_JOIN_BUTTON_KEY_LIST.includes(
    promotionData.promotionType.toUpperCase()
  );

  return (
    <>
      <PromotionDetailContainer>
        <BannerWrapper>
          <BannerImage promotionData={promotionData} />
        </BannerWrapper>
        <ContentContainer>
          <TextArea>
            <Title>{promotionData.name}</Title>
            <Description
              dangerouslySetInnerHTML={{
                __html: "<div>" + contentToDisplay + "</div>",
              }}
            />
          </TextArea>
          <TextArea>
            <Title>Promo Period</Title>
            <Description>
              {moment(promotionData.from).format("YYYY/MM/DD HH:mm:ss")} -{" "}
              {moment(promotionData.to).format("YYYY/MM/DD HH:mm:ss")}
            </Description>
          </TextArea>
          <TextArea>
            <Title>Terms & Conditions</Title>
            <Description
              dangerouslySetInnerHTML={{
                __html: "<div>" + termsToDisplay + "</div>",
              }}
            />
          </TextArea>
        </ContentContainer>
      </PromotionDetailContainer>
      {showJoinButton && (
        <JoinPromotionButtonWrapper>
          <JoinPromotionButton
            id={promotionData.id}
            promotionType={promotionData.promotionType}
          />
        </JoinPromotionButtonWrapper>
      )}
    </>
  );
};

export default PromotionDetail;
