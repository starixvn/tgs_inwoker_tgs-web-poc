import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import ChangeEmailDialog from "@/components/Mobile/pages/Profile/ProfileChangeEmail/ChangeEmailDialog";

type Props = {};
const ProfileChangeEmail = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <ChangeEmailDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default ProfileChangeEmail;
