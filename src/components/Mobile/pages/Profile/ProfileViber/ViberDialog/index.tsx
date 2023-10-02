import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import i18n from "@/utils/i18n";
import Viber from "@/components/_Share_Domain/Account/Profile/Viber";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const ViberDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={i18n.t("common.viber")}
      transitionComponent={LeftTransition}
    >
      <Viber />
    </DialogWithHeader>
  );
};

export default ViberDialog;
