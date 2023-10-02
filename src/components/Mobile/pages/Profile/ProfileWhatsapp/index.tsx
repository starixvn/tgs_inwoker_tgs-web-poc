import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import WhatsappDialog from "@/components/Mobile/pages/Profile/ProfileWhatsapp/WhatsappDialog";

type Props = {};
const ProfileWhatsapp = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <WhatsappDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default ProfileWhatsapp;
