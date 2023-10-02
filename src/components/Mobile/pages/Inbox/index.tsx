import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import InboxDialog from "@/components/Mobile/pages/Inbox/InboxDialog";

type Props = {};
const Inbox = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <InboxDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default Inbox;
