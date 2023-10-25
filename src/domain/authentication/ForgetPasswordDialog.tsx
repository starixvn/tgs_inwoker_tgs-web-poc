import React from "react";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";
import AuthDialog from "@/components/UI/Dialog/AuthDialog";
import ForgotPasswordPrev from "@/domain/authentication/ForgotPasswordPrev";
import { useNotifications } from "@/hooks/pageProps/useNotifications";
import { useHistory } from "react-router-dom";
import i18n from "@/utils/i18n";
import styled from "styled-components";

const TitleContainer = styled.div`
  align-self: start;
  font-size: 2rem;
  line-height: 1.758rem;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  margin: 56px 42px 0;
  overflow: visible;
`;

const AuthDialogWrapper = styled.div``;

type Props = {};
const ForgetPasswordDialog = ({}: Props) => {
  const { isForgetPasswordDialogOpen, handleToggleForgetPasswordDialog } =
    useAuthDialog();

  const { alert } = useNotifications();
  const history = useHistory();
  return (
    <AuthDialog
      isOpen={isForgetPasswordDialogOpen}
      handleCloseDialog={() => handleToggleForgetPasswordDialog(false)}
      maxWidth={"lg"}
      style={{
        fontSize: "0.937rem !important",
      }}
    >
      <>
        <TitleContainer>{i18n.t("forgotPassword.title")}</TitleContainer>
        <ForgotPasswordPrev alert={alert} history={history} />
      </>
    </AuthDialog>
  );
};

export default ForgetPasswordDialog;
