import React from "react";
import Button from "@/components/Mobile/components/UI/Button";
import * as Yup from "yup";
import styled from "styled-components";
import { themeList } from "@/theme";
import {
  FormInputFactory,
  FormInputTypeEnum,
} from "@/components/Mobile/components/FormikForm/FormInputFactory";

const theme = themeList["mobileT18"];

const ErrorMessageContainer = styled.div`
  color: ${theme.secondary};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  margin: 40px auto 8px;
`;

export interface FormikFormInput {
  type: FormInputTypeEnum;
  label: string;
  name: string;
  initialValue: string;
  validationSchema: Yup.Schema;
}

type Props = {
  formInputList: FormikFormInput[];
  formik: any;
  isLoading: boolean;
  buttonText: string;
  children: React.ReactElement;
  showErrorOn?: "bottom" | "input";
};

const FormikForm = ({
  formik,
  formInputList,
  isLoading,
  buttonText,
  children,
  showErrorOn = "bottom",
}: Props) => {
  const getBottomErrorMessage = () => {
    if (showErrorOn !== "bottom") return "";

    let errorMsg = "";
    // console.log(formik.errors);
    for (const formInput of formInputList) {
      if (!(formik.touched[formInput.name] && formik.errors[formInput.name]))
        continue;

      errorMsg = formik.errors[formInput.name];
      break;
    }

    return errorMsg;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {formInputList.map((formInput) => {
        const FormInput = FormInputFactory[formInput.type];
        if (!FormInput) return null;

        return (
          <FormInput
            key={formInput.name}
            formInput={formInput}
            formik={formik}
          />
        );
      })}
      {children}

      <ErrorMessageContainer>
        {showErrorOn === "bottom" && getBottomErrorMessage()}
      </ErrorMessageContainer>

      <Button
        fullWidth={true}
        style={{ marginBottom: "21px" }}
        type={"submit"}
        disabled={isLoading}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default FormikForm;
