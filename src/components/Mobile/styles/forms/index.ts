import styled from "styled-components";
import { FormControl as MuiFormControl } from "@mui/material";
import { withStyles } from "@mui/styles";
import { theme } from "@/theme";

export const Remark = styled.div`
  font-size: 0.937rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  margin-bottom: 20px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const LabelContainer = styled.div`
  font-size: 1.125rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  float: left;
  margin-bottom: 19px;
`;
export const FormControl = withStyles(() => ({
  root: {
    borderRadius: "5px",
    border: `1px solid ${theme.tertiary}`,
    width: "100%",
    fontSize: "0.937rem",
    "& fieldset": {
      border: "none",
    },
  },
}))(MuiFormControl);
