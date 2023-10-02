import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import ChangeWithdrawalPasswordDialog from "@/components/Mobile/pages/Profile/ProfileChangeWithdrawalPassword/ChangeWithdrawalPasswordDialog";

type Props = {};
const ProfileChangeWithdrawalPassword = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <ChangeWithdrawalPasswordDialog
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
    />
  );
};

export default ProfileChangeWithdrawalPassword;
