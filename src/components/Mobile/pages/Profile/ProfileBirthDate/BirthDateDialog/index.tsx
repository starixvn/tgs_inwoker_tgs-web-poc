import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import Birthdate from "@/components/_Share_Domain/Account/Profile/BirthDate";
import i18n from "@/utils/i18n";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const BirthDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={i18n.t("profile.birthdate.title")}
      transitionComponent={LeftTransition}
    >
      <Birthdate />
    </DialogWithHeader>
  );
};

export default BirthDialog;
