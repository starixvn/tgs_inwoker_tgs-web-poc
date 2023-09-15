import React from "react";
import {
  FormControl as MuiFormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import styled from "styled-components";

const StyledFormControl = styled(MuiFormControl)`
  background: #212937;
  border-radius: 8px;
  width: 117px;
  margin-right: 10px;

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
  background: #212937;
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
};
const Select = ({
  label,
  value,
  handleChange = () => {},
  selectItemList = [],
}: Props) => {
  return (
    <StyledFormControl variant="outlined">
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <StyledSelect
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>

        {selectItemList.map((selectItem) => {
          const { label, value } = selectItem;
          return <MenuItem value={value}>{label}</MenuItem>;
        })}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default Select;
