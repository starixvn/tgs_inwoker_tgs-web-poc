import FormText from "@/components/Mobile/components/FormikForm/FormInputFactory/FormText";
import FormPassword from "@/components/Mobile/components/FormikForm/FormInputFactory/FormPassword";
import FormPhone from "@/components/Mobile/components/FormikForm/FormInputFactory/FormPhone";

export enum FormInputTypeEnum {
  "TEXT",
  "PASSWORD",
  "NUMBER",
  "PHONE",
  "AREA_CODE",
}

export const FormInputFactory = {
  [FormInputTypeEnum.TEXT]: FormText,
  [FormInputTypeEnum.NUMBER]: FormText,
  [FormInputTypeEnum.PASSWORD]: FormPassword,
  [FormInputTypeEnum.PHONE]: FormPhone,
  [FormInputTypeEnum.AREA_CODE]: null,
};
