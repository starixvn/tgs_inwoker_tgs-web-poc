import React from "react";
import styled from "styled-components";
import Checkbox from "@/components/Mobile/components/UI/Checkbox";
import Dialog from "@/components/Mobile/components/UI/Dialog/Dialog";
import { themeList } from "@/theme";
import i18n from "@/utils/i18n";
import RedirectToLoginHint from "@/components/Mobile/pages/Register/components/RedirectToLoginHint";
import { useRegisterForm } from "@/hooks/auth/useAuthForm/useRegisterForm";
import FormikForm from "@/components/Mobile/components/FormikForm";

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

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: white;
  font-size: 0.937rem;
  margin: 8px 0;
  display: flex;
  align-items: start;
`;

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const RegisterDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { formInputConfigList, formik, isLoading } = useRegisterForm();

  return (
    <Dialog isOpen={isOpen} handleCloseDialog={handleCloseDialog}>
      <>
        <TitleContainer>
          {i18n.t("common.register")}
          <div className="bottom-border" />
        </TitleContainer>

        <FormikForm
          formInputList={formInputConfigList}
          formik={formik}
          isLoading={isLoading}
          buttonText={i18n.t("common.register")}
        >
          <VerifyAgeContainer>
            <Checkbox />
            {i18n.t("web.register.contract")}
          </VerifyAgeContainer>
        </FormikForm>

        <RedirectToLoginHint />
      </>
    </Dialog>
  );
};

export default React.memo(RegisterDialog);
