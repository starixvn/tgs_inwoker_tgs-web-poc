import React from "react";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";
import RegisterForm from "@/domain/authentication/RegisterForm";
import AuthDialog from "@/components/UI/Dialog/AuthDialog";
import AuthSwitchButtons from "@/domain/authentication/components/AuthSwitchButtons";

type Props = {};
const RegisterDialog = ({}: Props) => {
  const { isRegisterDialogOpen, handleToggleRegisterDialog } = useAuthDialog();

  return (
    <AuthDialog
      isOpen={isRegisterDialogOpen}
      handleCloseDialog={handleToggleRegisterDialog}
    >
      <>
        <AuthSwitchButtons activeAuthStep={"register"} />
        <RegisterForm />
      </>
    </AuthDialog>
  );
};

export default RegisterDialog;
