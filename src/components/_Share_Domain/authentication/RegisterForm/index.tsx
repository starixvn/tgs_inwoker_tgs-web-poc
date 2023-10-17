import React from "react";
import styled from "styled-components";
import Checkbox from "@/components/UI/Checkbox";
import i18n from "@/utils/i18n";
import RedirectToLoginHint from "@/components/_Share_Domain/authentication/RegisterForm/RedirectToLoginHint";
import { useRegisterForm } from "@/hooks/auth/useAuthForm/useRegisterForm";
import FormikForm from "@/components/Mobile/components/FormikForm";

const TitleContainer = styled.div`
  font-size: 3rem !important;
  line-height: 3.5rem !important;
  font-weight: 700 !important;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 41px;
  margin-top: 15.76%;

  & > .bottom-border {
    width: 68px;
    height: 5px;
    background: #6152dd;
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
    <>
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
    </>
  );
};

export default React.memo(RegisterForm);
