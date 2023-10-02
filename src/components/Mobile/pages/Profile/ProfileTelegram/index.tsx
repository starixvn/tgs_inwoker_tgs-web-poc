import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import TelegramDialog from "@/components/Mobile/pages/Profile/ProfileTelegram/TelegramDialog";

type Props = {};
const ProfileTelegram = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <TelegramDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default ProfileTelegram;
