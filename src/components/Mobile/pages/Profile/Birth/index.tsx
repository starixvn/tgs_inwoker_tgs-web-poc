import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import BirthDialog from "@/components/Mobile/pages/Profile/Birth/BirthDialog";

type Props = {};
const ProfileBirth = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <BirthDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileBirth;
