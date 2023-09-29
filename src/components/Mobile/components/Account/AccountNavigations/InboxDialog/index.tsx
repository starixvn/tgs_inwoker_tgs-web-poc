import React from "react";
import styled from "styled-components";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { themeList } from "@/theme";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import InboxPrev from "@/components/_Share_Domain/Account/InboxPrev";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useHistory } from "react-router-dom";

const theme = themeList["mobileT18"];

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const InboxDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <>
      <DialogWithHeader
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        dialogHeaderTitle={"Inbox"}
      >
        <InboxPrev alert={alert} history={history} />
      </DialogWithHeader>
    </>
  );
};

export default React.memo(InboxDialog);
