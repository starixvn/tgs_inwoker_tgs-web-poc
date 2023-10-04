import React from "react";
import styled from "styled-components";
import { TextField as MuiTextField, TextFieldProps } from "@material-ui/core";
import { themeList } from "@/theme";
import { withStyles } from "@material-ui/core/styles";

const theme = themeList["mobileT18"];

export const TextField = withStyles(() => ({
  root: {
    padding: "12px 20px",

    "& .MuiInput-input": {
      color: theme.white,
      fontSize: "1.125rem",
      fontWeight: 400,
    },
    "& input::placeholder": {
      color: `${theme.tertiaryLight}`,
      fontSize: "1.125rem",
      fontWeight: 400,
    },
    "& label.Mui-focused": {
      color: "gold",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
}))(MuiTextField);

export const GrayInputWrapper = styled.div`
  border-radius: 8px;
  background: ${theme.tertiaryDark};
  overflow: visible;
`;
