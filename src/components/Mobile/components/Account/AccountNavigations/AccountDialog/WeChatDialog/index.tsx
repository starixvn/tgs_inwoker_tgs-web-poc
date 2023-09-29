import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import WeChat from "@/components/_Share_Domain/Account/Profile/WeChat";
import i18n from "@/utils/i18n";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const WeChatDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={i18n.t("common.wechatNumber")}
      transitionComponent={LeftTransition}
    >
      <WeChat />
    </DialogWithHeader>
  );
};

export default WeChatDialog;
