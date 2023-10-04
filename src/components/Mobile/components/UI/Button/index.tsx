import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

export const Button = withStyles(() => ({
  root: {
    borderRadius: "12px",
    padding: "12px 20px",
    fontSize: "1.125rem",
    fontWeight: 500,
    "&:disabled": {
      background: theme.tertiaryDark,
      color: theme.white,
    },
  },
}))(MuiButton);
