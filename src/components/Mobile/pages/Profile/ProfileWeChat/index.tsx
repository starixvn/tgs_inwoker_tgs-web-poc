import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import WeChatDialog from "@/components/Mobile/pages/Profile/ProfileWeChat/WeChatDialog";

type Props = {};
const ProfileWeChat = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <WeChatDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileWeChat;
