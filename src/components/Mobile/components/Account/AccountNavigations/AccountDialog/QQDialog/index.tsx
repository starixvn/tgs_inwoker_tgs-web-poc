import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const QQDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"QQ"}
      transitionComponent={LeftTransition}
    >
      <h1>HELLO</h1>
    </DialogWithHeader>
  );
};

export default QQDialog;
