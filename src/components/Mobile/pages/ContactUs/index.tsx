import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import ContactUsDialog from "@/components/Mobile/pages/ContactUs/ContactUsDialog";

type Props = {};
const ContactUs = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <ContactUsDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default ContactUs;
