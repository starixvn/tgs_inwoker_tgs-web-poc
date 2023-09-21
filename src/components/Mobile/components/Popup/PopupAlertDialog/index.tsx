import React from "react";
import i18n from "@/utils/i18n";
import styled from "styled-components";
import { StyledDialog } from "@/components/Wap/components/PopupAlertModal/StyledDialog";
import { useNotifications } from "@/hooks/useNotifications";

const DialogTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 30px 0 20px 45px;
  color: #4a4a4a;
`;
const DialogMessage = styled.div`
  font-size: 26px;
  margin: 20px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;

const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;
  font-size: 34px;
  text-align: center;
  padding-top: 24px;
  margin: 10px auto;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  color: #ffffff;
`;

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
    <StyledDialog onClose={closeAlertPopup} open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogMessage>{message}</DialogMessage>
      <ModalButtons
        handleClose={closeAlertPopup}
        message={message}
        action={action}
      />
    </StyledDialog>
  );
};

export default React.memo(PopupAlertDialog);
