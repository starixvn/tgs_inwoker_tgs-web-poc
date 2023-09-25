import React from "react";
import styled from "styled-components";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useNotifications } from "@/hooks/useNotifications";
import { useHistory } from "react-router-dom";
import TransferPrev from "@/components/Mobile/components/Account/AccountNavigations/TransferDialog/TransferPrev";

const theme = themeList["mobileT18"];

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const TransferDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <>
      <DialogWithHeader
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        dialogHeaderTitle={"Transfer"}
      >
        <TransferPrev alert={alert} history={history} />
      </DialogWithHeader>
    </>
  );
};

export default React.memo(TransferDialog);
