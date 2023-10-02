import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import ViberDialog from "@/components/Mobile/pages/Profile/ProfileViber/ViberDialog";

type Props = {};
const ProfileViber = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <ViberDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileViber;
