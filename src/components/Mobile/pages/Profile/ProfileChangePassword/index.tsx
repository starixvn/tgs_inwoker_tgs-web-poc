import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import ChangePasswordDialog from "@/components/Mobile/pages/Profile/ProfileChangePassword/ChangePasswordDialog";

type Props = {};
const ProfileChangePassword = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <ChangePasswordDialog
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
    />
  );
};

export default ProfileChangePassword;
