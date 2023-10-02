import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import QQ from "@/components/_Share_Domain/Account/Profile/QQ";
import i18n from "@/utils/i18n";
import ResetWithdrawalPassword from "@/components/_Share_Domain/Account/Profile/ResetWithdrawalPassword";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const ResetWithdrawalPasswordDialog = ({
  isOpen,
  handleCloseDialog,
}: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={i18n.t("profile.resetResetWithdrawalPassword.title")}
      transitionComponent={LeftTransition}
    >
      <ResetWithdrawalPassword />
    </DialogWithHeader>
  );
};

export default ResetWithdrawalPasswordDialog;
