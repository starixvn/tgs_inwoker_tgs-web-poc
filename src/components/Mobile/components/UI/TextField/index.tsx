import React from "react";
import styled from "styled-components";
import { TextField as MuiTextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import { theme } from "@/theme";

export const TextField = withStyles(() => ({
  root: {
    color: theme.white,
    overflow: "visible",

    "& .MuiInput-input": {
      padding: "12px 20px",
      color: theme.white,
      fontSize: "1.125rem",
      fontWeight: 400,
      border: "none",
    },
    "& input": {
      color: theme.white,
    },
    "& input::placeholder": {
      color: theme.tertiaryLight,
      fontSize: "1.125rem",
      fontWeight: 400,
    },
    "& label": {
      color: theme.white,
    },
    "& label.Mui-focused": {
      color: theme.white,
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
}))(MuiTextField);

export const GrayInputWrapper = styled.div`
  border-radius: 5px;
  border: none;
  background: ${({ theme }) => theme.tertiaryDark};
  overflow: visible;
`;
