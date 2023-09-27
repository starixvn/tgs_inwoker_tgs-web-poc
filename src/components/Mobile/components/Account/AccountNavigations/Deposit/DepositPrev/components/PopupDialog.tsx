import React, { useCallback } from "react";
import i18n from "@/utils/i18n";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Dialog";
import styled from "styled-components";
import { WALLET_HIDEMESSAGE } from "@/api-services/constant/actionType";
import { useDispatch } from "react-redux";
import { useWalletStore } from "@/hooks/stores/useWalletStore";

const StyledModalPopup = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);

const DialoTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 0 auto;
  display: table;
  color: #4a4a4a;
`;
const DialogMessage = styled.div`
  font-size: 26px;
  margin: 30px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;

const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(to top, ${({ theme }) =>
    theme.primaryGradient},
      ${({ theme }) => theme.primary}));
  color: #ffffff;
`;

type Props = {};
const PopupDialog = (props: Props) => {
  const { wallet } = useWalletStore();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch({
      type: WALLET_HIDEMESSAGE,
    });
  }, []);

  return (
    <StyledModalPopup onClose={handleClose} open={wallet.message !== ""}>
      <DialoTitle>{i18n.t("common.info")}</DialoTitle>
      <DialogMessage>{wallet.message}</DialogMessage>
      <ButtonConfirm onClick={handleClose}>
        {i18n.t("common.confirm")}
      </ButtonConfirm>
    </StyledModalPopup>
  );
};

export default React.memo(PopupDialog);
