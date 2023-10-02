import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useHistory } from "react-router-dom";
import NameVerify from "@/components/_Share_Domain/Account/Profile/id-verification";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const NameDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={"Real Name"}
      transitionComponent={LeftTransition}
    >
      <NameVerify alert={alert} appHistory={history} />
    </DialogWithHeader>
  );
};

export default NameDialog;
