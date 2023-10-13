import React from "react";
import i18n from "@/utils/i18n";
import { Select } from "@/components/Mobile/components/UI/Select";
import styled from "styled-components";
import { FormControl } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

const StatusSelectContainer = styled.div`
  padding: 15px 29px;
  background: ${({ theme }) => theme.tertiaryDark};
  font-size: 0.937rem;
  color: ${({ theme }) => theme.white};
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(35, 31, 27, 0.1);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SelectLabel = styled.div`
  margin-right: 80px;
`;

const SelectFormControl = muiStyled(FormControl)(({ theme }) => ({
  flexGrow: 1,
  padding: 0,
  "& fieldset": {
    border: "none",
  },
  "& select": {
    padding: 0,
    color: theme.palette.common.white,
    fontSize: "0.937rem",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.common.white,
  },
}));

export interface StatusDictionary {
  [key: string]: string | null;
}

type Props = {
  statusDictionary: StatusDictionary;
  handleStatusChange: (e: any) => void;
  status: string;
};
const StatusSelect = ({
  statusDictionary,
  handleStatusChange,
  status,
}: Props) => {
  return (
    <StatusSelectContainer>
      <SelectLabel>{i18n.t("report.status")}</SelectLabel>

      <SelectFormControl variant="outlined">
        <Select native onChange={handleStatusChange} value={status} fullWidth>
          <option value={""}>{i18n.t("report.all")}</option>

          {Object.keys(statusDictionary).map((key) => {
            return (
              <option key={key} value={key}>
                {i18n.t(`report.withdrawal.status${key}`)}
              </option>
            );
          })}
        </Select>
      </SelectFormControl>
    </StatusSelectContainer>
  );
};

export default StatusSelect;
