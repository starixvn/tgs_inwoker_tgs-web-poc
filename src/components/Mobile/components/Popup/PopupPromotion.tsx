import { useState } from "react";
import styled from "styled-components";
import usePromotion from "@/hooks/usePromotion";
import NotShowAgainHint from "@/components/Mobile/components/Popup/NotShowAgainHint";
import TagBg from "@/assets/images/promotion/tag_bg.svg";
import Carousel from "@/components/Mobile/components/UI/Carousel";
import { Promotion } from "@/models/dto/general/GetPromotionListResDto";
import { Dialog as MuiDialog } from "@mui/material";
import { UpTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import IconCloseButton from "@/assets/images/promotion/close_icon.svg";
import { useHistory } from "react-router-dom";
import BannerImage from "@/components/Mobile/components/Promotion/BannerImage";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@/hooks/useRwd";

const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";

const DialogPopup = styled(MuiDialog)`
  & .MuiPaper-root {
    width: 370px;
    height: 177px;
    background: ${({ theme }) => theme.primaryLight};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;

    ${media.sm} {
      width: 688px;
      height: 429px;
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
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  cursor: pointer;

  ${media.sm} {
    top: calc(50% + 280px);
  }
`;

const PromotionBannerWrapper = styled.div`
  width: 370px;
  height: 177px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.sm} {
    width: 688px;
    height: 429px;
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
  const { isSmSize } = useRwd();

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
          <NotShowAgainHint
            onClick={handleClickCheckbox}
            isCheck={isCheck}
            style={{
              top: isSmSize ? "calc(50% + 100px)" : "calc(50% + 230px)",
            }}
          />
          <CloseBtn onClick={handleCloseDialog}>
            <img src={IconCloseButton} />
          </CloseBtn>
        </ChildContainer>
      </DialogPopup>
    </>
  );
};

export default PopupPromotion;
