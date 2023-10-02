import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import ChangePhoneDialog from "@/components/Mobile/pages/Profile/ProfileChangePhone/ChangePhoneDialog";

type Props = {};
const ProfileChangePhone = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <ChangePhoneDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default ProfileChangePhone;
