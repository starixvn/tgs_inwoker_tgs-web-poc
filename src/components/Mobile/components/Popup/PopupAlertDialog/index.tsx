import React from "react";
import i18n from "@/utils/i18n";
import { useNotifications } from "@/hooks/useNotifications";
import DialogPopup from "@/components/Mobile/components/UI/Dialog/DialogPopup";
import {
  ButtonConfirm,
  DialogContent,
  DialogTitle,
} from "@/components/Mobile/components/UI/Dialog/dialogStyles";

type ModalButtonsProps = {
  handleClose: () => void;
  message: string;
  action: string;
};

const ModalButtons = ({ handleClose, message, action }: ModalButtonsProps) => {
  if (message === "无法连接，请检查您的网络") {
    return (
      <ButtonConfirm onClick={() => window.location.reload()}>
        {i18n.t("common.reload")}
      </ButtonConfirm>
    );
  } else {
    return (
      <div>
        <ButtonConfirm onClick={handleClose}>
          {i18n.t("common.confirm")}
        </ButtonConfirm>

        {action && <div onClick={handleClose}>{action}</div>}
      </div>
    );
  }
};

const PopupAlertDialog = () => {
  const { isOpen, title, message, action, closeAlertPopup } =
    useNotifications();

  return (
    <DialogPopup isOpen={isOpen} handleCloseDialog={closeAlertPopup}>
      <>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{message}</DialogContent>

        <ModalButtons
          handleClose={closeAlertPopup}
          message={message}
          action={action}
        />
      </>
    </DialogPopup>
  );
};

export default React.memo(PopupAlertDialog);
