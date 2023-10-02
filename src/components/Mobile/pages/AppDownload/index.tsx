import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import DownloadAppDialog from "@/components/Mobile/pages/AppDownload/DownloadAppDialog";

type Props = {};
const AppDownload = (props: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    setIsOpen(false);
    history.goBack();
  }, []);

  return (
    <DownloadAppDialog isOpen={isOpen} handleCloseDialog={handleCloseDialog} />
  );
};

export default AppDownload;
