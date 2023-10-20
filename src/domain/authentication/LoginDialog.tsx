import React from "react";
import Dialog from "@/components/UI/Dialog/Dialog";
import LoginForm from "@/domain/authentication/LoginForm";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";

type Props = {};
const LoginDialog = ({}: Props) => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();
  return (
    <Dialog
      isOpen={isLoginDialogOpen}
      handleCloseDialog={handleToggleLoginDialog}
    >
      <LoginForm />
    </Dialog>
  );
};

export default LoginDialog;
