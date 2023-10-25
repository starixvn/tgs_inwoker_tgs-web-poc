import React from "react";
import { TextField, GrayInputWrapper } from "@/components/UI/TextField";
import { FormikFormInput } from "@/components/FormikForm";
import styled from "styled-components";
import { Select } from "@/components/UI/Select";
import config from "@/config/config";
import { MenuItem } from "@mui/material";

const PhoneContainer = styled.div`
  display: flex;
  overflow: visible;
`;

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormPhone = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name, type } = formInput;

  return (
    <PhoneContainer>
      <GrayInputWrapper
        key={"areaCode"}
        style={{ marginBottom: "21px", marginRight: "10px" }}
      >
        <Select
          type={"string"}
          placeholder={formik.values["areaCode"]}
          variant={"outlined"}
          fullWidth
          name={"areaCode"}
          value={formik.values["areaCode"]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value={config.features.PhonePrefix}>
            {config.features.PhonePrefix}
          </MenuItem>
        </Select>
      </GrayInputWrapper>
      <GrayInputWrapper key={name} style={{ marginBottom: "21px", flex: 1 }}>
        <TextField
          type={"text"}
          placeholder={label}
          variant={"outlined"}
          fullWidth
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            showErrorOn === "input" &&
            formik.touched[name] &&
            formik.errors[name]
          }
          error={
            showErrorOn === "input" &&
            !!formik.touched[name] &&
            !!formik.errors[name]
          }
          inputProps={{
            autoComplete: "off",
          }}
        />
      </GrayInputWrapper>
    </PhoneContainer>
  );
};

export default FormPhone;
