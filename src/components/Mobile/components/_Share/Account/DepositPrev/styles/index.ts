import styled from "styled-components";
import config from "@/config/config";
import { withStyles } from "@material-ui/core/styles";
import {
  FormControl as MuiFormControl,
  Select as MuiSelect,
} from "@material-ui/core";
import { themeList } from "@/theme";
const theme = themeList["mobileT18"];

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const LabelContainer = styled.div`
  font-size: 1.125rem;
  font-weight: 400;
  color: ${theme.white};
  float: left;
  margin-bottom: 19px;
`;
export const FormControl = withStyles(() => ({
  root: {
    borderRadius: "10px",
    border: `1px solid ${theme.tertiary}`,
    width: "100%",
    fontSize: "0.937rem",
    "& fieldset": {
      border: "none",
    },
  },
}))(MuiFormControl);

export const Select = withStyles(() => ({
  root: {
    color: `${theme.tertiary}`,
    "&:focus": {
      background: "none",
    },
    "&:active": {
      background: "none",
    },
  },
  select: {
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
