import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { DatePicker as MuiDatePicker } from "@material-ui/pickers";

export const DatePicker = withStyles(() => ({
  root: {
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
  },
}))(MuiDatePicker);
