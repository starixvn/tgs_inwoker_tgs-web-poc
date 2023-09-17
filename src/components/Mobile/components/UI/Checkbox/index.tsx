import React from "react";
import { Checkbox as MuiCheckbox, CheckboxProps } from "@material-ui/core";
import styled from "styled-components";

const StyledCheckbox = styled(MuiCheckbox)`
  color: white;
  padding: 0 8px !important;
  &.Mui-checked {
    color: #6152dd;
  }
`;
const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox;
