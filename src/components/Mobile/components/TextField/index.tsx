import React from "react";
import styled from "styled-components";
import { TextField as MuiTextField, TextFieldProps } from "@material-ui/core";

const StyledTextField = styled(MuiTextField)`
  background: #212937;
  overflow: visible;

  & input {
    color: #ffffff;
  }

  & .MuiFormLabel-root {
    color: #646973;
  }
`;
const TextField = (props: TextFieldProps) => {
  // @ts-ignore
  return <StyledTextField {...props} />;
};

export default TextField;
