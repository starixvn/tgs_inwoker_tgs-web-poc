import React from "react";
import { styled as muiStyled } from "@mui/material/styles";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";

export const DatePicker = muiStyled(MuiDatePicker)(({ theme }) => ({
  "& .MuiInput-underline:after": {
    borderBottom: "none",
  },
}));
