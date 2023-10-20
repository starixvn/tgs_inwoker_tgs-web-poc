import styled from "styled-components";
import { FormControl as MuiFormControl } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
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
export const FormControl = muiStyled(MuiFormControl)(({ theme }) => ({
  borderRadius: "5px",
  border: `1px solid ${theme.palette.tertiary.main}`,
  width: "100%",
  fontSize: "0.937rem",
  "& fieldset": {
    border: "none",
  },
}));

export const InfoContainer = styled.div`
  width: 100%;
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};

  display: flex;
  align-items: center;
`;
