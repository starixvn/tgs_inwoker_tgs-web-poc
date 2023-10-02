import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import QQDialog from "@/components/Mobile/pages/Profile/ProfileQQ/QQDialog";

type Props = {};
const ProfileQQ = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <QQDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileQQ;
