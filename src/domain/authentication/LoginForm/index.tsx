import React from "react";
import i18n from "@/utils/i18n";
import FormikForm from "@/components/FormikForm";
import Checkbox from "@/components/UI/Checkbox";
import RedirectToRegisterHint from "@/domain/authentication/LoginForm/RedirectToRegisterHint";
import { useLoginForm } from "@/hooks/auth/useAuthForm/useLoginForm";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "@/components/UI/Loading";
import { media } from "@/theme/breakpoints";

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 56px 15px;

  ${media.sm} {
    padding: 42px 42px;
  }
`;

const TitleContainer = styled.div`
  font-size: 2.5rem;
  line-height: 3.5rem;
  font-weight: 700;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 41px;
  white-space: nowrap;

  & > .bottom-border {
    width: 68px;
    height: 5px;
    background: #6152dd;
  }

  ${media.sm} {
    display: none;
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

const ForgotPasswordContainer = styled(Link)`
  color: #5d50e0;
  font-size: 0.937rem;
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
    loginError,
    needToRemember,
    handleClickNeedToRemember,
  } = useLoginForm();

  return (
    <LoginFormContainer>
      <TitleContainer>
        {i18n.t("common.login")}
        <div className="bottom-border" />
      </TitleContainer>

      <FormikForm
        formInputList={formInputConfigList}
        formik={formik}
        isLoading={isLoading}
        error={loginError}
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

          <ForgotPasswordContainer to={"/forgot-password"}>
            {i18n.t("forgotPassword.title")}?
          </ForgotPasswordContainer>
        </FormSubContainer>
      </FormikForm>

      <RedirectToRegisterHint />

      <Loading show={isLoading} />
    </LoginFormContainer>
  );
};

export default LoginForm;
