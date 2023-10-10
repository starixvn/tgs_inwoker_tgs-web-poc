import React from "react";
import i18n from "@/utils/i18n";
import FormikForm from "@/components/Mobile/components/FormikForm";
import Checkbox from "@/components/Mobile/components/UI/Checkbox";
import RedirectToRegisterHint from "@/components/_Share_Domain/authentication/LoginForm/RedirectToRegisterHint";
import { useLoginForm } from "@/hooks/auth/useAuthForm/useLoginForm";
import styled from "styled-components";

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

type Props = {};

const LoginForm = (props: Props) => {
  const {
    formInputConfigList,
    formik,
    isLoading,
    needToRemember,
    handleClickNeedToRemember,
  } = useLoginForm();

  return (
    <>
      <TitleContainer>
        {i18n.t("common.login")}
        <div className="bottom-border" />
      </TitleContainer>

      <FormikForm
        formInputList={formInputConfigList}
        formik={formik}
        isLoading={isLoading}
        buttonText={i18n.t("common.login")}
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

export default LoginForm;
