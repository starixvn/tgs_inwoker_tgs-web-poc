import React from "react";
import styled from "styled-components";
import { TextField as MuiTextField, TextFieldProps } from "@material-ui/core";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const StyledTextField = styled(MuiTextField)`
  overflow: visible;
  border-radius: 8px;

  & input {
    //background: #212937;
    color: white !important;
  }

  & .MuiFormLabel-root {
    color: #646973;
  }
`;

type Props = TextFieldProps & {};

const TextField = (props: Props) => {
  // @ts-ignore
  return <StyledTextField {...props} variant={"outlined"} />;
};

export default TextField;

export const GrayInputWrapper = styled.div`
  border-radius: 8px;
  background: ${theme.tertiaryDark};
  overflow: visible;
`;
