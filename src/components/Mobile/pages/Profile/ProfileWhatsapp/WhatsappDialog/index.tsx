import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import i18n from "@/utils/i18n";
import Whatsapp from "@/components/_Share_Domain/Account/Profile/Whatsapp";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const WhatsappDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={i18n.t("common.whatsapp")}
      transitionComponent={LeftTransition}
    >
      <Whatsapp />
    </DialogWithHeader>
  );
};

export default WhatsappDialog;
