import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import NameForm from "@/components/Mobile/components/Account/AccountNavigations/AccountDialog/NameDialog/NameForm";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const NameDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Real Name"}
      transitionComponent={LeftTransition}
    >
      <NameForm />
    </DialogWithHeader>
  );
};

export default NameDialog;
