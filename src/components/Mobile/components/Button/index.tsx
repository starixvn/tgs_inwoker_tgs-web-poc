import React, { CSSProperties } from "react";
import styled from "styled-components";
import { Button as MuiButton, ButtonProps } from "@material-ui/core";

const StyledButton = styled(MuiButton)`
  padding: 12px 20px;
  color: #ffffff;
  border-radius: 12px;
  border: 0;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.318rem;
  cursor: pointer;
  background: #5d50e0;
`;

const Button = (props: ButtonProps) => {
  // @ts-ignore
  return (
    <StyledButton {...props} color="primary">
      {props.children}
    </StyledButton>
  );
};

export default Button;
