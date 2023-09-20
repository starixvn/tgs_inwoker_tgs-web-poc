import React from "react";
import styled from "styled-components";
import TextField from "@/components/Mobile/components/UI/TextField";
import Checkbox from "@/components/Mobile/components/UI/Checkbox";
import Button from "@/components/Mobile/components/UI/Button";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import Select from "@/components/Mobile/components/UI/Select";
import Dialog from "@/components/Mobile/components/UI/Dialog/Dialog";
import { themeList } from "@/theme";

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

const FormContainer = styled.div`
  overflow: visible;
  & > div {
    margin-bottom: 21px;
  }
`;

const PhoneValidationContainer = styled.div`
  display: flex;
  overflow: visible;
`;

const VerifyAgeContainer = styled.div`
  width: 100%;
  color: white;
  font-size: 0.937rem;
  margin: 8px 0;
  display: flex;
  align-items: start;
`;

const CreateAccountContainer = styled.div`
  color: white;
  font-size: 1.062rem;
  font-weight: 400;
  line-height: 1.245;
  align-self: baseline;
  display: flex;
  align-items: center;

  .login {
    color: #5d50e0;
    margin-left: 8px;
  }
`;

const RegisterDialog = () => {
  const { isRegisterOpen, toggleRegisterDialog, toggleLoginDialog } =
    useAuthDialog();

  const handleRedirectToLogin = () => {
    toggleRegisterDialog();
    toggleLoginDialog();
  };

  return (
    <Dialog isOpen={isRegisterOpen} handleCloseDialog={toggleRegisterDialog}>
      <>
        <TitleContainer>
          REGISTER
          <div className="bottom-border" />
        </TitleContainer>

        <FormContainer>
          <TextField label={"Username"} fullWidth />
          <TextField label={"Password"} fullWidth />
          <TextField label={"Confirm Password"} fullWidth />

          <PhoneValidationContainer>
            <Select
              label={"+852"}
              value={""}
              handleChange={() => {}}
              selectItemList={[]}
            />
            <TextField label={"Please Enter Phone Number"} fullWidth />
          </PhoneValidationContainer>

          <TextField label={"Invitation Code"} fullWidth />

          <VerifyAgeContainer>
            <Checkbox />
            <span>
              I confirm that I am at least 18 years old and have read and
              accepted the policy statement, terms and conditions of this
              website.
            </span>
          </VerifyAgeContainer>
        </FormContainer>

        <Button
          fullWidth={true}
          style={{ background: "#5D50E0", marginBottom: "21px" }}
        >
          Sign up
        </Button>

        <CreateAccountContainer>
          <span>Already Have An Account?</span>
          <span className={"login"} onClick={handleRedirectToLogin}>
            Login
          </span>
        </CreateAccountContainer>
      </>
    </Dialog>
  );
};

export default React.memo(RegisterDialog);
