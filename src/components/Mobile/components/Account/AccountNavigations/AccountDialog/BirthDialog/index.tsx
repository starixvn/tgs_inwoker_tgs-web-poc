import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { useNotifications } from "@/hooks/useNotifications";
import { useHistory } from "react-router-dom";
import Birthdate from "@/components/_Share_Domain/Account/Profile/BirthDate";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const BirthDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Birth Date"}
      transitionComponent={LeftTransition}
    >
      <Birthdate />
    </DialogWithHeader>
  );
};

export default BirthDialog;
