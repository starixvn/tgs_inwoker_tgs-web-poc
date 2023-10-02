import React from "react";
import DialogWithHeader from "@/components/Mobile/components/UI/Dialog/DialogWithHeader";
import { LeftTransition } from "@/components/Mobile/components/UI/Dialog/Transition";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useHistory } from "react-router-dom";
import ChangePassword from "@/components/_Share_Domain/Account/Profile/ChangePassword";
import i18n from "@/utils/i18n";

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};
const ChangePasswordDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <DialogWithHeader
      isOpen={isOpen}
      handleCloseDialog={handleCloseDialog}
      dialogHeaderTitle={i18n.t("profile.changePassword.editPassword")}
      transitionComponent={LeftTransition}
    >
      <ChangePassword alert={alert} appHistory={history} />
    </DialogWithHeader>
  );
};

export default ChangePasswordDialog;
