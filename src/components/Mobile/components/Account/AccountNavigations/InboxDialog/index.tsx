import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import Inbox from "@/components/_Share_Domain/Account/Inbox";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const InboxDialog = ({ isOpen, handleCloseDialog }: Props) => {
  return (
    <>
      <DialogWithHeader
        isOpen={isOpen}
        handleCloseDialog={handleCloseDialog}
        dialogHeaderTitle={"Inbox"}
      >
        <Inbox />
      </DialogWithHeader>
    </>
  );
};

export default React.memo(InboxDialog);
