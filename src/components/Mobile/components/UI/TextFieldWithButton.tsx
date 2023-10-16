import React from "react";
import styled from "styled-components";
import { TextField } from "@/components/Mobile/components/UI/TextField";
import { Button } from "@/components/Mobile/components/UI/Button";
import { InputAdornment, TextFieldProps } from "@mui/material";

const CustomText = styled.div`
  display: flex;
  justify-content: space-between;
  & .MuiInputAdornment-root {
    overflow: visible;
    border-radius: 5px;
  }
`;

const ButtonContainer = styled.div`
  padding: 10px 6px;

  & > button {
    height: 30px;
    font-size: 0.75rem;
    padding: 7px 9px;
  }
`;

const TextFieldWithButton = (
  props: TextFieldProps & {
    label: string;
    maxLength?: number;
    buttonlabel?: string;
  }
) => {
  return (
    <CustomText>
      <TextField
        type={props.type ? props.type : "text"}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled || false}
        placeholder={props.placeholder}
        maxLength={props.maxLength || 50}
        // endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
      />

      <ButtonContainer>
        <Button onClick={props.onClick}>{props.buttonlabel}</Button>
      </ButtonContainer>
    </CustomText>
  );
};

export default TextFieldWithButton;
