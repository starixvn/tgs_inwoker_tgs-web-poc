import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import PasswordDialog from "@/components/Mobile/pages/Profile/Password/PasswordDialog";

type Props = {};
const ProfilePassword = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <PasswordDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default ProfilePassword;
