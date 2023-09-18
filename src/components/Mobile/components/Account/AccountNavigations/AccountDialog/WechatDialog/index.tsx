import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const WechatDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Wechat Account"}
      transitionComponent={LeftTransition}
    >
      <h1>HELLO</h1>
    </DialogWithHeader>
  );
};

export default WechatDialog;
