import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import PhoneDialog from "@/components/Mobile/pages/Profile/ProfilePhone/PhoneDialog";

type Props = {};
const ProfilePhone = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <PhoneDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default ProfilePhone;
