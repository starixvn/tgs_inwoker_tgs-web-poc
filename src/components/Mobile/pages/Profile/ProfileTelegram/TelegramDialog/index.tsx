import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import i18n from "@/utils/i18n";
import Telegram from "@/components/_Share_Domain/Account/Profile/Telegram";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const TelegramDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={i18n.t("common.telegram")}
      transitionComponent={LeftTransition}
    >
      <Telegram />
    </DialogWithHeader>
  );
};

export default TelegramDialog;
