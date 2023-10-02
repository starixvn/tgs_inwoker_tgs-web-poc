import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import i18n from "@/utils/i18n";
import WithdrawalPassword from "@/components/_Share_Domain/Account/Profile/WithdrawalPassword";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const WithdrawalPasswordDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={i18n.t("profile.withdrawalPassword.title")}
      transitionComponent={LeftTransition}
    >
      <WithdrawalPassword />
    </DialogWithHeader>
  );
};

export default WithdrawalPasswordDialog;
