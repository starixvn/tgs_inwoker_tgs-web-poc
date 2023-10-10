import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import Dialog from "@/components/Mobile/components/UI/Dialog/Dialog";
import LoginForm from "@/components/_Share_Domain/authentication/LoginForm";

type Props = {};
const Login = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.push("/");
  }, []);

  return (
    <Dialog isOpen={isOpen} handleCloseDialog={handleCloseDialog}>
      <LoginForm />
    </Dialog>
  );
};

export default Login;
