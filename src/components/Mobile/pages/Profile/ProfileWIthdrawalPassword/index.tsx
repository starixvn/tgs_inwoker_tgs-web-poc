import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import WithdrawalPasswordDialog from "@/components/Mobile/pages/Profile/ProfileWIthdrawalPassword/WithdrawalPasswordDialog";

type Props = {};
const ProfileWithdrawalPassword = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <WithdrawalPasswordDialog
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
    />
  );
};

export default ProfileWithdrawalPassword;
