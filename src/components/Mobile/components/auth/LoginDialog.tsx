import React from "react";
import styled from "styled-components";
import TextField from "@/components/Mobile/components/TextField";
import Checkbox from "@/components/Mobile/components/Checkbox";
import Button from "@/components/Mobile/components/Button";
import { Dialog, IconButton, Slide } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";
import { useAuthDialog } from "@/components/Mobile/hooks/useAuthDialog";

const LoginDialogContainer = styled(Dialog)`
  background: #181f2b;
  font-family: Roboto;

  & .MuiPaper-root {
    position: relative;
    padding: 15px;
    background: #181f2b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

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

const RememberMeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: #6152dd;
  font-size: 0.937rem;
  margin: 8px 0;
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  // @ts-ignore
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginDialog = () => {
  const { isLoginOpen, toggleLoginDialog, toggleRegisterDialog } =
    useAuthDialog();

  const handleRedirectToRegister = () => {
    toggleLoginDialog();
    toggleRegisterDialog();
  };

  return (
    <LoginDialogContainer
      fullScreen
      open={isLoginOpen}
      TransitionComponent={Transition}
    >
      <CloseIcon
        onClick={toggleLoginDialog}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          color: "white",
        }}
      />

      <TitleContainer>
        LOGIN
        <div className="bottom-border" />
      </TitleContainer>

      <TextField
        label={"username"}
        variant={"outlined"}
        fullWidth
        style={{ marginBottom: "21px" }}
      />
      <TextField label={"password"} variant={"outlined"} fullWidth />

      <RememberMeContainer>
        <Checkbox />
        Remember Me
      </RememberMeContainer>

      <Button
        fullWidth={true}
        style={{ background: "#5D50E0", marginBottom: "21px" }}
      >
        Sign in
      </Button>

      <ForgotPasswordContainer>Forgot Password?</ForgotPasswordContainer>

      <CreateAccountContainer>
        <span>Don't have an account?</span>
        <span className="register" onClick={handleRedirectToRegister}>
          Create Account
        </span>
      </CreateAccountContainer>
    </LoginDialogContainer>
  );
};

export default React.memo(LoginDialog);
