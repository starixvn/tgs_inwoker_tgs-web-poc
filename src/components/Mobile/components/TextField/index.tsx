import React from "react";
import styled from "styled-components";
import { TextField as MuiTextField, TextFieldProps } from "@material-ui/core";

const StyledTextField = styled(MuiTextField)`
  background: #212937;
  overflow: visible;
  border-radius: 8px;

  & input {
    color: #ffffff;
  }

  & .MuiFormLabel-root {
    color: #646973;
  }
`;
const TextField = (props: TextFieldProps) => {
  // @ts-ignore
  return <StyledTextField {...props} variant={"outlined"} />;
};

export default TextField;
