import React from "react";
import TextField from "@/components/Mobile/components/TextField";
import Checkbox from "@/components/Mobile/components/Checkbox";
import Button from "@/components/Mobile/components/Button";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const initialValues: { [key in string]: any } = {};
const validationSchemaSpec: { [key in string]: any } = {};

formInputList.forEach((loginInput) => {
  const { name, initialValue, validationSchema } = loginInput;
  initialValues[name] = initialValue;
  validationSchemaSpec[name] = validationSchema;
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaSpec),
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
        <Checkbox />
        Remember Me
      </RememberMeContainer>

      <Button
        fullWidth={true}
        style={{ background: "#5D50E0", marginBottom: "21px" }}
        type={"submit"}
      >
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
