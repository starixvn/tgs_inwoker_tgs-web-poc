import { useState } from "react";
import styled from "styled-components";
import usePromotion from "@/hooks/usePromotion";
import NotShowAgainHint from "@/components/Mobile/components/Popup/NotShowAgainHint";
import TagBg from "@/assets/images/promotion/tag_bg.svg";
import Carousel from "@/components/Mobile/components/UI/Carousel";
import { Promotion } from "@/models/dto/general/GetPromotionListResDto";
import { Dialog as MuiDialog } from "@material-ui/core";
import { UpTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { themeList } from "@/theme";
import IconCloseButton from "@/assets/images/promotion/close_icon.svg";

const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";
const theme = themeList["mobileT18"];

const DialogPopup = styled(MuiDialog)`
  & .MuiPaper-root {
    width: 370px;
    height: 177px;
    background: ${theme.primaryLight};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
`;

const PromotionTag = styled.div`
  width: 213px;
  height: 43px;
  background: url(${TagBg}) no-repeat center center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseBtn = styled.div`
  position: fixed;
  z-index: 99;
  top: calc(50% + 150px);
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

const PromotionBannerWrapper = styled.div`
  width: 370px;
  height: 177px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const PromotionBanner = ({ promotionData }: { promotionData: Promotion }) => {
  return (
    <PromotionBannerWrapper>
      <img src={promotionData.mobileBanner} alt={promotionData.name} />
    </PromotionBannerWrapper>
  );
};

const PopupPromotion = () => {
  const disableDialog =
    window.sessionStorage &&
    sessionStorage.getItem(doNotShowPromotionDialogKey) === "true";

  const [open, setOpen] = useState(!disableDialog);
  const [isCheck, setIsCheck] = useState(false);

  const { displayPromotionList } = usePromotion();

  const handleClickCheckbox = () => {
    setIsCheck((prevIsCheck) => !prevIsCheck);
  };
  const handleCloseDialog = () => {
    if (isCheck) {
      sessionStorage.setItem(doNotShowPromotionDialogKey, "true");
    }
    setOpen(false);
  };

  const isEmptyData = displayPromotionList.length === 0;

  if (isEmptyData || disableDialog) return null;
  return (
    <>
      <DialogPopup open={open} TransitionComponent={UpTransition}>
        <>
          <Carousel>
            {displayPromotionList.map((promotionData: Promotion) => (
              <PromotionBanner
                key={promotionData.id}
                promotionData={promotionData}
              />
            ))}
          </Carousel>
          <PromotionTag>PROMOTIONS</PromotionTag>
          <NotShowAgainHint
            onClick={handleClickCheckbox}
            isCheck={isCheck}
            style={{ top: "calc(50% + 100px)" }}
          />
          <CloseBtn onClick={handleCloseDialog}>
            <img src={IconCloseButton} />
          </CloseBtn>
        </>
      </DialogPopup>
    </>
  );
};

export default PopupPromotion;
