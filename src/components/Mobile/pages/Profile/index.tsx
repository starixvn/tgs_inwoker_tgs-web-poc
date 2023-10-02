import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import ProfileDialog from "@/components/Mobile/pages/Profile/ProfileDialog";

type Props = {};
const Profile = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <ProfileDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default Profile;
