import React from "react";
import TextField, {
  GrayInputWrapper,
} from "@/components/Mobile/components/UI/TextField";
import Button from "@/components/Mobile/components/UI/Button";
import * as Yup from "yup";
import styled from "styled-components";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const ErrorMessageContainer = styled.div`
  color: ${theme.secondary};
  font-size: 0.875rem;
  font-weight: 400;
  text-align: center;
  margin: 40px auto 8px;
`;

export enum FormInputTypeEnum {
  "TEXT",
  "PASSWORD",
}

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
        const { label, name, type } = formInput;

        const inputType =
          type === FormInputTypeEnum.PASSWORD ? "password" : "text";

        return (
          <GrayInputWrapper key={name} style={{ marginBottom: "21px" }}>
            <TextField
              type={inputType}
              label={label}
              variant={"outlined"}
              fullWidth
              name={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={
                showErrorOn === "input" &&
                formik.touched[name] &&
                formik.errors[name]
              }
              error={
                showErrorOn === "input" &&
                !!formik.touched[name] &&
                !!formik.errors[name]
              }
            />
          </GrayInputWrapper>
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
