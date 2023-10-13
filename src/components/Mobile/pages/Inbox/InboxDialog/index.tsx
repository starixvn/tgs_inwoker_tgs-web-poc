import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import Inbox from "@/components/_Share_Domain/Account/Inbox";
import i18n from "@/utils/i18n";

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
        dialogHeaderTitle={i18n.t("inbox.title")}
      >
        <Inbox />
      </DialogWithHeader>
    </>
  );
};

export default React.memo(InboxDialog);
