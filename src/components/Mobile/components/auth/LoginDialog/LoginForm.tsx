import React, { useState } from "react";
import TextField from "@/components/Mobile/components/TextField";
import Checkbox from "@/components/Mobile/components/Checkbox";
import Button from "@/components/Mobile/components/Button";
import styled from "styled-components";
import { FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { CircularProgress } from "@material-ui/core";

const RememberMeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: #6152dd;
  font-size: 0.937rem;
  margin: 8px 0;
`;

// form
const formInputList = [
  {
    label: "Username",
    name: "username",
    initialValue: "",
    validationSchema: Yup.string().required("Username is required"),
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    initialValue: "",
    validationSchema: Yup.string().required("Password is required"),
  },
];

const initialValues: FormikValues = {};
const validationSchemaSpec: { [key in string]: any } = {};

formInputList.forEach((loginInput) => {
  const { name, initialValue, validationSchema } = loginInput;
  initialValues[name] = initialValue;
  validationSchemaSpec[name] = validationSchema;
});

type Props = {
  isLoading: boolean;
  handleClickLogin: (
    username: string,
    password: string,
    needToRemember?: boolean
  ) => Promise<void>;
};
const LoginForm = ({ isLoading, handleClickLogin }: Props) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaSpec),
    onSubmit: async (values) => {
      const { username, password } = values;
      await handleClickLogin(username, password, needToRemember);
    },
  });

  const [needToRemember, setNeedToRemember] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      {formInputList.map((formInput) => {
        const { label, name, type } = formInput;
        return (
          <TextField
            key={name}
            type={type}
            label={label}
            variant={"outlined"}
            fullWidth
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            style={{ marginBottom: "21px" }}
            helperText={formik.touched[name] && formik.errors[name]}
            error={!!formik.touched[name] && !!formik.errors[name]}
          />
        );
      })}

      <RememberMeContainer>
        <Checkbox
          value={needToRemember}
          onChange={() => setNeedToRemember((prevState) => !prevState)}
        />
        Remember Me
      </RememberMeContainer>

      <Button
        fullWidth={true}
        style={{ marginBottom: "21px" }}
        type={"submit"}
        disabled={isLoading}
      >
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
