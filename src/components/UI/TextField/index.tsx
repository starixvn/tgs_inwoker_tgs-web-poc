import React from "react";
import styled from "styled-components";
import { TextField as MuiTextField } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

export const TextField = muiStyled(MuiTextField)(({ theme }) => ({
  color: theme.palette.common.white,
  overflow: "visible",
  input: {
    padding: "12px 20px",
    color: theme.palette.common.white,
    fontSize: "1.125rem",
    fontWeight: 400,
    border: "none",
  },
  "& input::placeholder": {
    // color: theme.palette.tertiary.light,
    fontSize: "1.125rem",
    fontWeight: 400,
  },
  label: {
    color: "rgba(255,255,255,0.3)",
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

export const GrayInputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: none;
  background: ${({ theme }) => theme.tertiaryDark};
  overflow: visible;
`;
