import { useState } from "react";
import styled from "styled-components";
import usePromotion from "@/hooks/usePromotion";
import NotShowAgainHint from "@/components/Mobile/components/Popup/NotShowAgainHint";
import DialogPopup from "@/components/Mobile/components/UI/Dialog/DialogPopup";
import TagBg from "@/assets/images/promotion/tag_bg.svg";

const doNotShowPromotionDialogKey = "doNotShowPromotionDialog";

const PromotionTag = styled.div`
  width: 213px;
  height: 43px;
  background: url(${TagBg}) no-repeat center center;
`;

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
    <DialogPopup isOpen={open} handleCloseDialog={handleCloseDialog}>
      <>
        <PromotionTag />
        <NotShowAgainHint onClick={handleClickCheckbox} isCheck={isCheck} />
      </>
    </DialogPopup>
  );
};

export default PopupPromotion;
