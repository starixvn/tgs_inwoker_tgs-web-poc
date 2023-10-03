import { useMemo } from "react";
import { FormikFormInput } from "@/components/Mobile/components/FormikForm";
import i18n from "@/utils/i18n";
import { FormInputTypeEnum } from "@/components/Mobile/components/FormikForm/FormInputFactory";
import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { useFormikInitValue } from "@/hooks/auth/useAuthForm/hooks/useFormikInitValue";
import config from "@/config/config";

type Props = {
  handleClickRegister: (values: FormikValues) => Promise<void>;
};

export function useGenerateRegisterFormik({ handleClickRegister }: Props) {
  // ===== init form input config =====
  const formInputConfigList = useMemo<FormikFormInput[]>(() => {
    return [
      {
        label: i18n.t("wap.register.username"),
        name: "username",
        initialValue: "",
        type: FormInputTypeEnum.TEXT,
        validationSchema: Yup.string()
          .required("Username is required")
          .matches(/^[a-zA-Z0-9]{6,16}$/, {
            message: i18n.t("common.msgRegisterUserNameInvalid"),
          }),
      },
      {
        label: i18n.t("wap.register.password"),
        name: "password",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "",
        validationSchema: Yup.string()
          .required("Password is required")
          .matches(/^.{6,20}$/, {
            message: i18n.t("common.msgRegisterPassInvalid"),
          }),
      },
      {
        label: i18n.t("wap.register.confirmPassword"),
        name: "confirmPassword",
        type: FormInputTypeEnum.PASSWORD,
        initialValue: "",
        validationSchema: Yup.string()
          .required()
          //@ts-ignore
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      },
      (() => {
        if (config.features.Register_ShowPhone) return;

        return {
          label: i18n.t("forgotPassword.plsEnterPhoneNumber"),
          name: "phone",
          initialValue: "",
          type: FormInputTypeEnum.PHONE,
          validationSchema: Yup.string()
            .required("Phone is required")
            .matches(
              new RegExp(`^[0-9]{8,${config.features.MAX_PHONE_LENGTH || 10}}`),
              {
                message: i18n
                  .t("common.noReachMin")
                  .replace(
                    /{maxlength}/g,
                    `${config.features.MAX_PHONE_LENGTH || 10}`
                  ),
              }
            ),
        };
      })(),
      (() => {
        if (config.features.Register_ShowPhone) return;
        return {
          label: "",
          name: "areaCode",
          initialValue: config.features.PhonePrefix,
          type: FormInputTypeEnum.AREA_CODE,
        };
      })(),
      (() => {
        if (!config.features.Register_ShowEmail) return;

        return {
          label: i18n.t("wap.register.email"),
          name: "email",
          initialValue: "",
          type: FormInputTypeEnum.TEXT,
          validationSchema: Yup.string()
            .required("Email is required")
            .matches(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              {
                message: i18n.t("common.msgInvalidEmail"),
              }
            ),
        };
      })(),
      {
        label: i18n.t("wap.register.promoteCode"),
        name: "promoteCode",
        initialValue: "",
        type: FormInputTypeEnum.TEXT,
        validationSchema: Yup.string(),
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
      await handleClickRegister(values);
    },
  });

  return {
    formInputConfigList,
    formik,
  };
}
