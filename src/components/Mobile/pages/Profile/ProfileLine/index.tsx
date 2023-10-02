import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import LineDialog from "@/components/Mobile/pages/Profile/ProfileLine/LineDialog";

type Props = {};
const ProfileLine = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <LineDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default ProfileLine;
