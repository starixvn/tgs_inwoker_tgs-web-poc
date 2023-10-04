import React, { useState } from "react";
import {
  TextField,
  GrayInputWrapper,
} from "@/components/Mobile/components/UI/TextField";
import { FormikFormInput } from "@/components/Mobile/components/FormikForm";
import { IconButton, InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormPassword = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name } = formInput;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const inputType = isShowPassword ? "text" : "password";
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
          showErrorOn === "input" && formik.touched[name] && formik.errors[name]
        }
        error={
          showErrorOn === "input" &&
          !!formik.touched[name] &&
          !!formik.errors[name]
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ height: "20px" }}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                style={{ color: "white" }}
              >
                {isShowPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </GrayInputWrapper>
  );
};

export default FormPassword;
