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

export const StyledButton = muiStyled(MuiButton)(({ theme }) => ({
  whiteSpace: "nowrap",
  borderRadius: "5px",
  padding: "12px 20px",
  fontSize: "1.125rem",
  fontWeight: 500,
  "&:disabled": {
    background: theme.tertiaryDark,
    color: theme.palette.common.white,
  },
}));

export const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      color={props.color || "primary"}
      variant={props.variant || "contained"}
      {...props}
    />
  );
};
