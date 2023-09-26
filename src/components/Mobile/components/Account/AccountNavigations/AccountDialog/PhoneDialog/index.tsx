import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { useNotifications } from "@/hooks/useNotifications";
import Phone from "@/components/Mobile/components/_PrevProfile/Phone";
import { useHistory } from "react-router-dom";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const PhoneDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Phone Number"}
      transitionComponent={LeftTransition}
    >
      <Phone />
    </DialogWithHeader>
  );
};

export default PhoneDialog;
