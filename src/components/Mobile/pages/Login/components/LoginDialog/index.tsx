import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Dialog from "@/components/Mobile/components/UI/Dialog/Dialog";
import { themeList } from "@/theme";
import FormikForm from "@/components/Mobile/components/FormikForm";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import RedirectToRegisterHint from "@/components/Mobile/pages/Login/components/RedirectToRegisterHint";
import i18n from "@/utils/i18n";
import Checkbox from "@/components/Mobile/components/UI/Checkbox";

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

type Props = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

const LoginDialog = ({ isOpen, handleCloseDialog }: Props) => {
  const { formInputConfigList, formik, isLoading, buttonText } = useLoginForm();
  const [needToRemember, setNeedToRemember] = useState(false);

  return (
    <Dialog isOpen={isOpen} handleCloseDialog={handleCloseDialog}>
      <>
        <TitleContainer>
          {i18n.t("common.login")}
          <div className="bottom-border" />
        </TitleContainer>

        <FormikForm
          formInputList={formInputConfigList}
          formik={formik}
          isLoading={isLoading}
          buttonText={buttonText}
        >
          <FormSubContainer>
            <RememberMeContainer>
              <Checkbox
                value={needToRemember}
                onChange={() => setNeedToRemember((prevState) => !prevState)}
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
    </Dialog>
  );
};

export default React.memo(LoginDialog);
