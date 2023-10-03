import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterDialog from "@/components/Mobile/pages/Register/components/RegisterDialog";

type Props = {};
const Inbox = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.push("/");
  }, []);

  return (
    <RegisterDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default Inbox;
