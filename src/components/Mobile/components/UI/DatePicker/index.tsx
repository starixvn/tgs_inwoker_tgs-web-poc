import React from "react";
import { withStyles } from "@mui/styles";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";

export const DatePicker = withStyles(() => ({
  root: {
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
  },
}))(MuiDatePicker);
