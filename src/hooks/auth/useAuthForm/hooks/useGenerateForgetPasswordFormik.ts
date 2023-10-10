import { useMemo } from "react";
import { FormikFormInput } from "@/components/Mobile/components/FormikForm";
import i18n from "@/utils/i18n";
import { FormInputTypeEnum } from "@/components/Mobile/components/FormikForm/FormInputFactory";
import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { useFormikInitValue } from "@/hooks/auth/useAuthForm/hooks/useFormikInitValue";

type Props = {
  handleClickSubmit: (values: FormikValues) => Promise<void>;
};

export function useGenerateForgetPasswordFormik({ handleClickSubmit }: Props) {
  // ===== init form input config =====
  const formInputConfigList = useMemo<FormikFormInput[]>(() => {
    return [
      {
        label: i18n.t("wap.register.username"),
        name: "username",
        initialValue: "",
        type: FormInputTypeEnum.TEXT,
        validationSchema: Yup.string().required("Username is required"),
      },
      {
        label: i18n.t("wap.register.password"),
        name: "password",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "",
        validationSchema: Yup.string().required("Password is required"),
      },
    ].filter((item) => !!item) as FormikFormInput[];
  }, []);

  const { getFormikInitValue } = useFormikInitValue();
  const { initialValues, validationSchemaSpec } =
    getFormikInitValue(formInputConfigList);

  // ===== formik =====
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaSpec),
    onSubmit: async (values) => {
      await handleClickSubmit(values);
    },
  });

  return {
    formInputConfigList,
    formik,
  };
}
