import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { useNotifications } from "@/hooks/useNotifications";
import { useHistory } from "react-router-dom";
import WeChat from "@/components/Mobile/components/_PrevProfile/WeChat";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const WeChatDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Wechat Account"}
      transitionComponent={LeftTransition}
    >
      <WeChat alert={alert} appHistory={history} />
    </DialogWithHeader>
  );
};

export default WeChatDialog;
