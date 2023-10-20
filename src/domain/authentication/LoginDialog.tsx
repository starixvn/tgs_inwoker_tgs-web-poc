import React from "react";
import LoginForm from "@/domain/authentication/LoginForm";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";
import AuthDialog from "@/components/UI/Dialog/AuthDialog";
import AuthSwitchButtons from "@/domain/authentication/components/AuthSwitchButtons";

type Props = {};
const LoginDialog = ({}: Props) => {
  const { isLoginDialogOpen, handleToggleLoginDialog } = useAuthDialog();
  return (
    <AuthDialog
      isOpen={isLoginDialogOpen}
      handleCloseDialog={handleToggleLoginDialog}
    >
      <>
        <AuthSwitchButtons activeAuthStep={"login"} />
        <LoginForm />
      </>
    </AuthDialog>
  );
};

export default LoginDialog;
