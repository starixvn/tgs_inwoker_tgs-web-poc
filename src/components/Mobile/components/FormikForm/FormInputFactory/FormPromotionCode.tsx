import React from "react";
import {
  TextField,
  GrayInputWrapper,
} from "@/components/Mobile/components/UI/TextField";
import { FormikFormInput } from "@/components/Mobile/components/FormikForm";
import { getFormInputType } from "@/components/Mobile/components/FormikForm/utils/getFormInputType";
import styled from "styled-components";
import { Select } from "@/components/Mobile/components/UI/Select";
import { MenuItem } from "@material-ui/core";
import config from "@/config/config";
import { UserTypeEnum } from "@/hooks/auth/useAuthForm/useRegisterForm";
import i18n from "@/utils/i18n";

const FormPromotionCodeContainer = styled.div`
  position: relative;
`;
const DropdownContainer = styled.div`
  width: 81px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border: none;
  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }
`;

type Props = {
  formInput: FormikFormInput;
  formik: any;
  showErrorOn?: "bottom" | "input";
};

const FormPromotionCode = ({ formInput, formik, showErrorOn }: Props) => {
  const { label, name, type } = formInput;

  return (
    <FormPromotionCodeContainer style={{ marginBottom: "21px" }}>
      <GrayInputWrapper key={name}>
        <TextField
          type={getFormInputType(type)}
          label={label}
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
        />

        <DropdownContainer>
          <Select
            type={"string"}
            label={formik.values["userType"]}
            variant={"outlined"}
            fullWidth
            name={"userType"}
            value={formik.values["userType"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value={UserTypeEnum.AGENT}>
              {i18n.t("usertype.agent")}
            </MenuItem>
            <MenuItem value={UserTypeEnum.PLAYER}>
              {i18n.t("usertype.player")}
            </MenuItem>
          </Select>
        </DropdownContainer>
      </GrayInputWrapper>
    </FormPromotionCodeContainer>
  );
};

export default FormPromotionCode;
