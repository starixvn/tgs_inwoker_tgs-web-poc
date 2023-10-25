import React from "react";
import { TextField, GrayInputWrapper } from "@/components/UI/TextField";
import { FormikFormInput } from "@/components/FormikForm";
import { getFormInputType } from "@/components/FormikForm/utils/getFormInputType";

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormText = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name, type } = formInput;

  return (
    <GrayInputWrapper key={name} style={{ marginBottom: "21px" }}>
      <TextField
        type={getFormInputType(type)}
        placeholder={label}
        variant={"outlined"}
        fullWidth
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={
          showErrorOn === "input" && formik.touched[name] && formik.errors[name]
        }
        error={
          showErrorOn === "input" &&
          !!formik.touched[name] &&
          !!formik.errors[name]
        }
        inputProps={{
          autoComplete: "off",
        }}
      />
    </GrayInputWrapper>
  );
};

export default FormText;
