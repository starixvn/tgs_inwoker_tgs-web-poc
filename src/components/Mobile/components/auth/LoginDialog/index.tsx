import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import { useAuthDialog } from "@/components/Mobile/hooks/useAuthDialog";
import LoginForm from "@/components/Mobile/components/auth/LoginDialog/LoginForm";
import { useLogin } from "@/components/Mobile/components/auth/hooks/useLogin";
import Dialog from "@/components/Mobile/components/UI/Dialog";

const TitleContainer = styled.div`
  font-size: 3rem !important;
  line-height: 3.5rem !important;
  font-weight: 700 !important;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 41px;

  & > .bottom-border {
    width: 68px;
    height: 5px;
    background: #6152dd;
  }
`;

const ForgotPasswordContainer = styled.a`
  color: #5d50e0;
  font-size: 1.062rem;
  font-weight: 400;
  line-height: 1.245;
  align-self: baseline;
  margin-bottom: 18px;
`;

const CreateAccountContainer = styled.div`
  color: white;
  font-size: 1.062rem;
  font-weight: 400;
  line-height: 1.245;
  align-self: baseline;
  display: flex;
  align-items: center;

  & .register {
    color: #5d50e0;
    margin-left: 12px;
  }
`;

const LoginDialog = () => {
  const { isLoginOpen, toggleLoginDialog, toggleRegisterDialog } =
    useAuthDialog();

  const { loginState, handleClickLogin } = useLogin();

  const handleRedirectToRegister = useCallback(() => {
    toggleLoginDialog();
    toggleRegisterDialog();
  }, []);

  return (
    <Dialog isOpen={isLoginOpen} toggleDialog={toggleLoginDialog}>
      <TitleContainer>
        LOGIN
        <div className="bottom-border" />
      </TitleContainer>

      <LoginForm
        handleClickLogin={handleClickLogin}
        isLoading={loginState.isLoading}
      />

      <ForgotPasswordContainer>Forgot Password?</ForgotPasswordContainer>

      <CreateAccountContainer>
        <span>Don't have an account?</span>
        <span className="register" onClick={handleRedirectToRegister}>
          Create Account
        </span>
      </CreateAccountContainer>
    </Dialog>
  );
};

export default React.memo(LoginDialog);
