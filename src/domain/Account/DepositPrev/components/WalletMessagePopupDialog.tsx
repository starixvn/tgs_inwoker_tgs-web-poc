import React, { useCallback } from "react";
import i18n from "@/utils/i18n";
import { WALLET_HIDEMESSAGE } from "@/api-services/constant/actionType";
import { useDispatch } from "react-redux";
import { useWalletStore } from "@/hooks/stores/useWalletStore";
import DialogPopup from "@/components/UI/Dialog/DialogPopup";
import {
  DialogContent,
  DialogTitle,
  ButtonConfirm,
} from "@/components/UI/Dialog/dialogStyles";

type Props = {};
const WalletMessagePopupDialog = (props: Props) => {
  const { wallet } = useWalletStore();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch({
      type: WALLET_HIDEMESSAGE,
    });
  }, []);

  const isOpen = wallet.message !== "";

  return (
    <DialogPopup isOpen={isOpen} handleCloseDialog={handleClose}>
      <>
        <DialogTitle>{i18n.t("common.info")}</DialogTitle>
        <DialogContent>{wallet.message}</DialogContent>

        <ButtonConfirm onClick={handleClose}>
          {i18n.t("common.confirm")}
        </ButtonConfirm>
      </>
    </DialogPopup>
  );
};

export default React.memo(WalletMessagePopupDialog);
