import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import FacebookMessengerDialog from "@/components/Mobile/pages/Profile/ProfileFacebookMessenger/FacebookMessengerDialog";

type Props = {};
const ProfileFacebookMessenger = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <FacebookMessengerDialog
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
    />
  );
};

export default ProfileFacebookMessenger;
