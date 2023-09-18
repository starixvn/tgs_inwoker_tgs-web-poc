import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const EmailDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Email Address"}
      transitionComponent={LeftTransition}
    >
      <h1>Hello</h1>
    </DialogWithHeader>
  );
};

export default EmailDialog;
