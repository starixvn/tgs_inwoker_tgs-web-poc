import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Dialog from "@/components/Mobile/components/UI/Dialog/Dialog";
import { themeList } from "@/theme";
import FormikForm from "@/components/Mobile/components/FormikForm";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import RedirectToRegisterHint from "@/components/Mobile/pages/Login/LoginDialog/RedirectToRegisterHint";

const theme = themeList["mobileT18"];

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

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const LoginDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { formInputConfigList, formik, isLoading, buttonText } = useLoginForm();

  return (
    <Dialog isOpen={isOpen} handleCloseDialog={handleCloseDialog}>
      <>
        <TitleContainer>
          LOGIN
          <div className="bottom-border" />
        </TitleContainer>

        <FormikForm
          formInputList={formInputConfigList}
          formik={formik}
          isLoading={isLoading}
          buttonText={buttonText}
        >
          <ForgotPasswordContainer>Forgot Password?</ForgotPasswordContainer>
        </FormikForm>

        <RedirectToRegisterHint />
      </>
    </Dialog>
  );
};

export default React.memo(LoginDialog);
