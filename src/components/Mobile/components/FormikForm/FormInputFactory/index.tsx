import FormText from "@/components/Mobile/components/FormikForm/FormInputFactory/FormText";
import FormPassword from "@/components/Mobile/components/FormikForm/FormInputFactory/FormPassword";

export enum FormInputTypeEnum {
  "TEXT",
  "PASSWORD",
  "NUMBER",
  "PHONE",
}

export const FormInputFactory = {
  [FormInputTypeEnum.TEXT]: FormText,
  [FormInputTypeEnum.PASSWORD]: FormPassword,
  [FormInputTypeEnum.PHONE]: FormText,
};
