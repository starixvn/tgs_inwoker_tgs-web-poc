import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { useNotifications } from "@/hooks/useNotifications";
import { useHistory } from "react-router-dom";
import ChangePassword from "@/components/Mobile/components/_PrevProfile/ChangePassword";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const PasswordDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Login Password"}
      transitionComponent={LeftTransition}
    >
      {/*@ts-ignore*/}
      <ChangePassword alert={alert} appHistory={history} />
    </DialogWithHeader>
  );
};

export default PasswordDialog;
