import { useCallback, useMemo } from "react";
import { FormikValues } from "formik";
import { FormikFormInput } from "@/components/FormikForm";

export function useFormikInitValue() {
  const getFormikInitValue = useCallback(
    (formInputConfigList: FormikFormInput[]) => {
      const initialValues: FormikValues = {};
      const validationSchemaSpec: { [key in string]: any } = {};

      formInputConfigList.forEach((registerInput) => {
        const { name, initialValue, validationSchema } = registerInput;
        initialValues[name] = initialValue;
        validationSchemaSpec[name] = validationSchema;
      });
      return {
        initialValues,
        validationSchemaSpec,
      };
    },
    []
  );

  return { getFormikInitValue };
}
