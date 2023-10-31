import { Select as MuiSelect, SelectProps } from "@mui/material";
import { theme } from "@/theme";
import { styled as muiStyled } from "@mui/material/styles";
import React from "react";

export const StyledSelect = muiStyled(MuiSelect)(({ theme }) => ({
  color: theme.palette.tertiary.main,
  fontSize: "0.937rem",
  fontWeight: 400,
  "&:focus": {
    background: "none",
  },
  "&:active": {
    background: "none",
  },
  select: {
    color: theme.palette.tertiary.main,
    padding: "14px",
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
    "&:disabled": {
      color: theme.palette.tertiary.main,
      WebkitTextFillColor: `${theme.palette.common.white}`,
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.tertiary.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

export const Select = (props: SelectProps) => {
  return <StyledSelect {...props} />;
};
