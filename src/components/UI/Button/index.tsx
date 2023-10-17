import React from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    tertiaryDark: string;
    white: string;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    tertiaryDark: string;
    white: string;
  }
}

export const Button = muiStyled(MuiButton)(({ theme }) => ({
  whiteSpace: "nowrap",
  borderRadius: "5px",
  padding: "12px 20px",
  fontSize: "1.125rem",
  fontWeight: 500,
  "&:disabled": {
    background: theme.palette.tertiary.dark,
    color: theme.palette.common.white,
  },

  [theme.breakpoints.up("sm")]: {
    padding: "7px 20px",
  },
}));
