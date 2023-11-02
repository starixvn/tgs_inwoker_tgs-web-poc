import React from "react";
import styled from "styled-components";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

const StyledTextField = muiStyled(MuiTextField)(({ theme }) => ({
  color: theme.palette.common.white,
  overflow: "visible",
  input: {
    padding: "12px 20px",
    color: theme.palette.common.white,
    fontSize: "1.125rem",
    fontWeight: 400,
    border: "none",
    "&:-webkit-autofill": {
      WebkitTextFillColor: `${theme.palette.common.white} !important`,
    },
    "&:disabled": {
      WebkitTextFillColor: `${theme.palette.common.white}`,
    }
  },
  label: {
    color: "rgba(255,255,255,0.3)",
    alignItems: "center",
    fontSize: "1.125rem",
    fontWeight: 400,
  },
  placeholder: {
    color: "red",
  },

  "& input::placeholder": {
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.937rem",
    fontWeight: 400,
  },
  [theme.breakpoints.up("sm")]: {
    input: {
      fontSize: "0.937rem",
    },
    label: {
      fontSize: "0.937rem",
    },
    "& input::placeholder": {
      fontSize: "0.937rem",
    },
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
}));

export const TextField = (props: TextFieldProps) => {
  return (
    <StyledTextField
      {...props}
      fullWidth={
        typeof props.fullWidth !== "undefined" ? props.fullWidth : true
      }
    />
  );
};

export default MuiTextField;
export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: none;
  background: ${({ theme }) => theme.tertiaryDark};
  overflow: visible;
`;
