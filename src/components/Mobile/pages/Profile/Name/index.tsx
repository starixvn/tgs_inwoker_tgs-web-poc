import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import NameDialog from "@/components/Mobile/pages/Profile/Name/NameDialog";

type Props = {};
const ProfileName = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <NameDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileName;
