import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useHistory } from "react-router-dom";
import ChangeWithdrawalPassword from "@/components/_Share_Domain/Account/Profile/ChangeWithdrawalPassword";
import i18n from "@/utils/i18n";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const ChangeWithdrawalPasswordDialog = ({
  isOpen,
  handleCloseDialog,
}: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={i18n.t("profile.changeWithdrawalPassword.title")}
      transitionComponent={LeftTransition}
    >
      <ChangeWithdrawalPassword alert={alert} appHistory={history} />
    </DialogWithHeader>
  );
};

export default ChangeWithdrawalPasswordDialog;
