import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import Email from "@/components/Mobile/components/_Share/Account/Profile/Email";
import { useNotifications } from "@/hooks/useNotifications";
import { useHistory } from "react-router-dom";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const EmailDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Email Address"}
      transitionComponent={LeftTransition}
    >
      <Email alert={alert} appHistory={history} />
    </DialogWithHeader>
  );
};

export default EmailDialog;
