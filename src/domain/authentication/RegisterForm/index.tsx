import React from "react";
import styled from "styled-components";
import Checkbox from "@/components/UI/Checkbox";
import i18n from "@/utils/i18n";
import RedirectToLoginHint from "@/domain/authentication/RegisterForm/RedirectToLoginHint";
import { useRegisterForm } from "@/hooks/auth/useAuthForm/useRegisterForm";
import FormikForm from "@/components/FormikForm";
import { media } from "@/theme/breakpoints";
import Loading from "@/components/UI/Loading";

const RegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 56px 15px;

  ${media.sm} {
    padding: 42px 42px;
  }
`;

const TitleContainer = styled.div`
  font-size: 3rem;
  line-height: 3.5rem;
  font-weight: 700;
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

  ${media.sm} {
    display: none;
  }
`;

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: white;
  font-size: 0.937rem;
  margin: 8px 0;
  display: flex;
  align-items: start;
`;

type Props = {};

const RegisterForm = () => {
  const {
    formInputConfigList,
    formik,
    isLoading,
    registerError,
    isConfirmedAdult,
    handleClickConfirmAdult,
  } = useRegisterForm();

  return (
    <RegisterFormContainer>
      <TitleContainer>
        {i18n.t("common.register")}
        <div className="bottom-border" />
      </TitleContainer>

      <FormikForm
        formInputList={formInputConfigList}
        formik={formik}
        isLoading={isLoading}
        error={registerError}
        buttonText={i18n.t("common.register")}
      >
        <VerifyAgeContainer>
          <Checkbox
            value={isConfirmedAdult}
            onClick={handleClickConfirmAdult}
          />
          {i18n.t("web.register.contract")}
        </VerifyAgeContainer>
      </FormikForm>

      <RedirectToLoginHint />

      <Loading show={isLoading} noShrink={true} />
    </RegisterFormContainer>
  );
};

export default React.memo(RegisterForm);
