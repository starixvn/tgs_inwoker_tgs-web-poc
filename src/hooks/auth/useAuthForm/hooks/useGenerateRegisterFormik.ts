import { useMemo } from "react";
import { FormikFormInput } from "@/components/FormikForm";
import i18n from "@/utils/i18n";
import { FormInputTypeEnum } from "@/components/FormikForm/FormInputFactory";
import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { useFormikInitValue } from "@/hooks/auth/useAuthForm/hooks/useFormikInitValue";
import config from "@/config/config";
import { UserTypeEnum } from "@/hooks/auth/useAuthForm/useRegisterForm";

type Props = {
  handleClickSubmit: (values: FormikValues) => Promise<void>;
};

export function useGenerateRegisterFormik({ handleClickSubmit }: Props) {
  // ===== init form input config =====
  const formInputConfigList = useMemo<FormikFormInput[]>(() => {
    return [
      {
        label: i18n.t("common.username"),
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
        label: i18n.t("common.password"),
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
        if (!config.features.Register_ShowPhone) return;

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
        if (!config.features.Register_ShowPhone) return;
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
        type: FormInputTypeEnum.PROMOTION_CODE,
      },
      {
        label: i18n.t("wap.register.promoteCode"),
        name: "userType",
        initialValue: UserTypeEnum.PLAYER,
        type: FormInputTypeEnum.USER_TYPE,
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
