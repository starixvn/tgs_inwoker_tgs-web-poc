import { Select as MuiSelect, SelectProps } from "@mui/material";
import { theme } from "@/theme";
import { withStyles } from "@mui/styles";
import React from "react";

export const StyledSelect = withStyles(() => ({
  root: {
    color: `${theme.tertiary}`,
    fontSize: "0.937rem",
    fontWeight: 400,
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
  },
  select: {
    padding: "14px",
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
    "&:disabled": {
      color: `${theme.tertiary}`,
    },
  },
}))(MuiSelect);

export const Select = (props: SelectProps) => {
  return <StyledSelect {...props} />;
};
