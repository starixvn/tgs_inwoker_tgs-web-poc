import React, { useCallback, useState } from "react";
import TransferDialog from "@/components/Mobile/pages/Transfer/TransferDialog";
import { useHistory } from "react-router-dom";

type Props = {};
const Transfer = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <TransferDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default Transfer;
