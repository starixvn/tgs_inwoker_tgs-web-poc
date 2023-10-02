import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import ResetWithdrawalPasswordDialog from "@/components/Mobile/pages/Profile/ProfileResetWithdrawalPassword/ResetWithdrawalPasswordDialog";

type Props = {};
const ProfileResetWithdrawalPassword = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <ResetWithdrawalPasswordDialog
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
    />
  );
};

export default ProfileResetWithdrawalPassword;
