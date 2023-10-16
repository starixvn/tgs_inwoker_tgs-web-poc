import React from "react";
import i18n from "@/utils/i18n";
import DialogPopup from "@/components/Mobile/components/UI/Dialog/DialogPopup";
import {
  DialogContent,
  ButtonConfirm,
} from "@/components/Mobile/components/UI/Dialog/dialogStyles";

type Props = {
  isDialogOpen: boolean;
  handleClose: () => void;
  handleOpenPopupUrl: () => void;
};

const ResultPopupDialog = ({
  isDialogOpen,
  handleClose,
  handleOpenPopupUrl,
}: Props) => {
  return (
    <DialogPopup isOpen={isDialogOpen} handleCloseDialog={handleClose}>
      <>
        <DialogContent>{i18n.t("deposit.msgDialog")}</DialogContent>

        <ButtonConfirm onClick={handleOpenPopupUrl} style={{ float: "left" }}>
          {i18n.t("common.confirm")}
        </ButtonConfirm>
        <ButtonConfirm onClick={handleClose} style={{ float: "right" }}>
          {i18n.t("common.cancel")}
        </ButtonConfirm>
      </>
    </DialogPopup>
  );
};

export default ResultPopupDialog;
