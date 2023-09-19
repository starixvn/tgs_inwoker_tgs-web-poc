import React from "react";
import {
  FormControl as MuiFormControl,
  FormControlProps,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import styled from "styled-components";
import { themeList } from "@/theme";

const theme = themeList["mobileT18"];

const StyledFormControl = styled(MuiFormControl)`
  border-radius: 8px;
  margin-right: 10px;
  border: 1px solid ${theme.tertiary};

  & label {
    color: #646973;
  }

  & input {
    color: #ffffff;
  }

  & .MuiSelect-root {
    overflow: visible;
  }
`;

const StyledSelect = styled(MuiSelect)`
  //background: #212937;
  border-radius: 8px;
`;

interface SelectItem {
  label: string;
  value: any;
}

type Props = {
  label: string;
  value: any;
  handleChange: any;
  selectItemList: SelectItem[];
  backgroundColor?: string;
} & FormControlProps;
const Select = ({
  label,
  value,
  handleChange = () => {},
  selectItemList = [],
  backgroundColor = "#212937",
  ...others
}: Props) => {
  return (
    // @ts-ignore
    <StyledFormControl variant="outlined" {...others}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <StyledSelect
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
        label={label}
        style={{
          background: backgroundColor,
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {selectItemList.map((selectItem) => {
          const { label, value } = selectItem;
          return (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          );
        })}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default Select;
