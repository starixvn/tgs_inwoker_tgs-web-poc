import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "@/components/_Share_Domain/authentication/RegisterForm";
import Dialog from "@/components/Mobile/components/UI/Dialog/Dialog";

type Props = {};
const Register = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.push("/");
  }, []);

  return (
    <Dialog isOpen={isOpen} handleCloseDialog={handleCloseDialog}>
      <RegisterForm />
    </Dialog>
  );
};

export default Register;
