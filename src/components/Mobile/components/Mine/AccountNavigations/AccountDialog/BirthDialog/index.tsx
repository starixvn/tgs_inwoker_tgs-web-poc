import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const BirthDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Birth Date"}
      transitionComponent={LeftTransition}
    >
      <h1>Hello</h1>
    </DialogWithHeader>
  );
};

export default BirthDialog;
