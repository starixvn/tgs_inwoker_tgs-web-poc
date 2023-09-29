import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import ReportPrev from "@/components/_Share_Domain/Account/ReportPrev";
import { useNotifications } from "@/hooks/useNotifications";
import { useHistory } from "react-router-dom";

const theme = themeList["mobileT18"];

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const ReportDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();
  return (
    <>
      <DialogWithHeader
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        dialogHeaderTitle={"Report"}
      >
        <ReportPrev alert={alert} history={history} />
      </DialogWithHeader>
    </>
  );
};

export default React.memo(ReportDialog);
