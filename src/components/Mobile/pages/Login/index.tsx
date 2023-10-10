import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginDialog from "@/components/Mobile/pages/Login/components/LoginDialog";

type Props = {};
const Login = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.push("/");
  }, []);

  return <LoginDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default Login;
