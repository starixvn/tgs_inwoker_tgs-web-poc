import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import BirthDateDialog from "@/components/Mobile/pages/Profile/ProfileBirthDate/BirthDateDialog";

type Props = {};
const ProfileBirthDate = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <BirthDateDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default ProfileBirthDate;
