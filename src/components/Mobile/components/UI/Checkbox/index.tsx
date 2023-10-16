import React from "react";
import { Checkbox as MuiCheckbox, CheckboxProps } from "@mui/material";
import styled from "styled-components";

const StyledCheckbox = styled(MuiCheckbox)`
  color: white;
  &.Mui-checked {
    color: #6152dd;
  }
`;
const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox;
