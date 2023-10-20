import { FormInputTypeEnum } from "@/components/FormikForm/FormInputFactory";

export function getFormInputType(type: FormInputTypeEnum) {
  switch (type) {
    case FormInputTypeEnum.NUMBER:
    case FormInputTypeEnum.PHONE:
      return "number";

    case FormInputTypeEnum.PASSWORD:
      return "password";

    default:
      return "text";
  }
}
