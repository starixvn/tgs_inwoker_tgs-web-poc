import React from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";
import { withStyles } from "@mui/styles";
import { theme } from "@/theme";

export const StyledButton = withStyles(() => {
  return {
    root: {
      whiteSpace: "nowrap",
      borderRadius: "5px",
      padding: "12px 20px",
      fontSize: "1.125rem",
      fontWeight: 500,
      "&:disabled": {
        background: theme.tertiaryDark,
        color: theme.white,
      },
    },
  };
})(MuiButton);

export const Button = (props: ButtonProps) => {
  return (
    <StyledButton
      color={props.color || "primary"}
      variant={props.variant || "contained"}
      {...props}
    />
  );
};
