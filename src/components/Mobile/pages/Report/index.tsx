import React, { useCallback, useState } from "react";
import TransferDialog from "@/components/Mobile/pages/Transfer/TransferDialog";
import { useHistory } from "react-router-dom";
import ReportDialog from "@/components/Mobile/pages/Report/ReportDialog";

type Props = {};
const Report = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return <ReportDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />;
};

export default Report;
