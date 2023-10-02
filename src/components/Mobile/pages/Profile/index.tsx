import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import ProfileMenuDialog from "@/components/Mobile/pages/Profile/ProfileMenuDialog";

type Props = {};
const Profile = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <ProfileMenuDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default Profile;
