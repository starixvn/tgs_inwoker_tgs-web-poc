import IconCloseButton from "@/assets/images/promotion/close_icon.svg";
import TagBg from "@/assets/images/promotion/tag_bg.svg";
import NotShowAgainHint from "@/components/Popup/NotShowAgainHint";
import BannerImage from "@/components/Promotion/BannerImage";
import Carousel from "@/components/UI/Carousel";
import { UpTransition } from "@/components/UI/Dialog/Transition";
import usePromotion from "@/hooks/usePromotion";
import { useRwd } from "@/hooks/useRwd";
import { Promotion } from "@/models/dto/general/GetPromotionListResDto";
import { media } from "@/theme/breakpoints";
import { Dialog as MuiDialog } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";

const DialogPopup = styled(MuiDialog)`
  & .MuiPaper-root {
    width: 370px;
    height: auto;
    background: ${({ theme }) => theme.primaryLight};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin: 0;
    overflow: visible;

    ${media.sm} {
      max-width: 688px;
      width: 100%;
      height: auto;
    }
  }
`;

const ChildContainer = styled.div`
  width: 100%;
  height: auto;
`;

const PromotionTag = styled.div`
  width: 213px;
  height: 43px;
  background: url(${TagBg}) no-repeat center center;
  position: absolute;
  top: -10px;
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
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  cursor: pointer;
  margin-top: 60px;
`;

const PromotionBannerWrapper = styled.div`
  width: 370px;
  height: auto;
  & > img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  ${media.sm} {
    width: 688px;
    height: auto;
  }
`;
const PromotionBanner = ({
  handleCloseDialog,
  promotionData,
}: {
  handleCloseDialog: () => void;
  promotionData: Promotion;
}) => {
  const history = useHistory();

  const handleClickBanner = () => {
    handleCloseDialog();
    history.push("/promotion/" + promotionData.id);
  };
  return (
    <PromotionBannerWrapper onClick={handleClickBanner}>
      <BannerImage promotionData={promotionData} />
    </PromotionBannerWrapper>
  );
};

const PopupPromotion = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const disableDialog =
    window.sessionStorage &&
    sessionStorage.getItem(doNotShowPromotionDialogKey) === "true";

  const [isCheck, setIsCheck] = useState(false);

  const { displayPromotionList } = usePromotion();
  const { isMobileSize } = useRwd();

  const handleClickCheckbox = () => {
    setIsCheck((prevIsCheck) => !prevIsCheck);
  };
  const handleCloseDialog = () => {
    if (isCheck) {
      sessionStorage.setItem(doNotShowPromotionDialogKey, "true");
    }
    onClose();
  };

  const isEmptyData = displayPromotionList.length === 0;

  if (isEmptyData || disableDialog) return null;

  return (
    <>
      <DialogPopup open={open} TransitionComponent={UpTransition}>
        <ChildContainer>
          <Carousel>
            {displayPromotionList.map((promotionData: Promotion) => (
              <PromotionBanner
                key={promotionData.id}
                promotionData={promotionData}
                handleCloseDialog={handleCloseDialog}
              />
            ))}
          </Carousel>
          <PromotionTag>PROMOTIONS</PromotionTag>
          <NotShowAgainHint onClick={handleClickCheckbox} isCheck={isCheck} />
          <CloseBtn onClick={handleCloseDialog}>
            <img src={IconCloseButton} />
          </CloseBtn>
        </ChildContainer>
      </DialogPopup>
    </>
  );
};

export default PopupPromotion;
