import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import EmailDialog from "@/components/Mobile/pages/Profile/ProfileEmail/EmailDialog";

type Props = {};
const ProfileEmail = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <EmailDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileEmail;
