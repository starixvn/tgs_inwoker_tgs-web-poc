import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Dialog from "@/components/Mobile/components/UI/Dialog/Dialog";
import FormikForm from "@/components/Mobile/components/FormikForm";
import RedirectToRegisterHint from "@/components/_Share_Domain/authentication/LoginForm/RedirectToRegisterHint";
import i18n from "@/utils/i18n";
import Checkbox from "@/components/Mobile/components/UI/Checkbox";
import { useForgetPasswordForm } from "@/hooks/auth/useAuthForm/useForgetPasswordForm";

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

const FormSubContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RememberMeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: #6152dd;
  font-size: 0.937rem;
  //margin: 8px 0;
`;

const ForgotPasswordContainer = styled.a`
  color: #5d50e0;
  font-size: 1.062rem;
  font-weight: 400;
  line-height: 1.245;
  white-space: nowrap;
`;

const ForgetPasswordFrom = () => {
  const {
    formInputConfigList,
    formik,
    isLoading,
    needToRemember,
    handleClickNeedToRemember,
  } = useForgetPasswordForm();

  return (
    <>
      <TitleContainer>
        {i18n.t("forgotPassword.title")}
        <div className="bottom-border" />
      </TitleContainer>

      <FormikForm
        formInputList={formInputConfigList}
        formik={formik}
        isLoading={isLoading}
        buttonText={i18n.t("common.confirm")}
      >
        <FormSubContainer>
          <RememberMeContainer>
            <Checkbox
              value={needToRemember}
              onChange={handleClickNeedToRemember}
              style={{
                padding: "0px 5px 0px",
              }}
            />
            {i18n.t("wap.login.rememberMe")}
          </RememberMeContainer>

          <ForgotPasswordContainer>
            {i18n.t("forgotPassword.title")}?
          </ForgotPasswordContainer>
        </FormSubContainer>
      </FormikForm>

      <RedirectToRegisterHint />
    </>
  );
};

export default React.memo(ForgetPasswordFrom);
