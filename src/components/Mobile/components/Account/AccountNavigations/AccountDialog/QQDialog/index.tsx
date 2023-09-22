import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { useNotifications } from "@/hooks/useNotifications";
import { useHistory } from "react-router-dom";
import QQ from "@/components/Mobile/components/_PrevProfile/QQ";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const QQDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"QQ"}
      transitionComponent={LeftTransition}
    >
      <QQ alert={alert} appHistory={history} />
    </DialogWithHeader>
  );
};

export default QQDialog;
