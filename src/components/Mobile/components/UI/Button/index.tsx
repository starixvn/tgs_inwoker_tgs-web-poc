import React from "react";
import { Button as MuiButton, ButtonProps } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

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
