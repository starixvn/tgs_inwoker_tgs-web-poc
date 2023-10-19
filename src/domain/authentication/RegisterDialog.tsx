import React from "react";
import Dialog from "@/components/UI/Dialog/Dialog";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";
import RegisterForm from "@/domain/authentication/RegisterForm";

type Props = {};
const RegisterDialog = ({}: Props) => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();

  return (
    <Dialog
      isOpen={isRegisterDialogOpen}
      handleCloseDialog={handleToggleRegisterDialog}
    >
      <RegisterForm />
    </Dialog>
  );
};

export default RegisterDialog;
