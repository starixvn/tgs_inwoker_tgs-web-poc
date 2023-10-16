import React from "react";
import styled from "styled-components";
import { TextField } from "@/components/Mobile/components/UI/TextField";
import { Button } from "@/components/Mobile/components/UI/Button";
import { InputAdornment, TextFieldProps } from "@mui/material";

const CustomText = styled.div`
  & .MuiInputAdornment-root {
    overflow: visible;
    border-radius: 5px;
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
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              style={{
                height: "100%",
              }}
            >
              <Button onClick={props.onClick}>{props.buttonlabel}</Button>
            </InputAdornment>
          ),
        }}
      />
    </CustomText>
  );
};

export default TextFieldWithButton;
