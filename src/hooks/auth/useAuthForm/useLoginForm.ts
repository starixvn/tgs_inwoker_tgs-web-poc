import { useCallback, useMemo, useState } from "react";
import * as Yup from "yup";
import i18n from "@/utils/i18n";
import { FormikValues, useFormik } from "formik";
import { FormikFormInput } from "@/components/Mobile/components/FormikForm";
import { useAuth } from "@/hooks/auth/useAuth";
import { FormInputTypeEnum } from "@/components/Mobile/components/FormikForm/FormInputFactory";

export function useLoginForm() {
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

  const { initialValues, validationSchemaSpec } = useMemo(() => {
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
  }, [formInputConfigList]);

  // ===== handle click login =====
  const { handleLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [needToRemember, setNeedToRemember] = useState(false);
  const handleClickNeedToRemember = () => {
    setNeedToRemember((prevState) => !prevState);
  };

  const handleClickLogin = useCallback(async (values: FormikValues) => {
    const { username, password } = values;
    await handleLogin(username, password, needToRemember);
  }, []);

  // ===== formik =====
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaSpec),
    onSubmit: async (values) => {
      await handleClickLogin(values);
    },
  });

  const buttonText = i18n.t("common.login");
  return {
    formInputConfigList,
    formik,
    isLoading,
    buttonText,
  };
}
