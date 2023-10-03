import { useCallback, useMemo, useState } from "react";
import * as Yup from "yup";
import i18n from "@/utils/i18n";
import { FormikValues, useFormik } from "formik";
import { FormikFormInput } from "@/components/Mobile/components/FormikForm";
import config from "@/config/config";
import { FormInputTypeEnum } from "@/components/Mobile/components/FormikForm/FormInputFactory";

export function useRegisterForm() {
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

  // ===== handle click register =====
  const [isLoading, setIsLoading] = useState(false);
  const handleClickRegister = useCallback(async (values: FormikValues) => {
    console.log(values);
  }, []);

  // ===== promotion =====
  const [promotionData, setPromotionData] = useState({
    withPromo: !(
      config.affiliateId === "" &&
      localStorage.getItem("promotionId") === "" &&
      !localStorage.getItem("promotionId")
    ),
    promoId:
      config.affiliateId !== ""
        ? config.affiliateId
        : localStorage.getItem("promotionId"),
    promotionChannelId: localStorage.getItem("promotionChannelId"),
    //TGS-357
    upper: localStorage.getItem("upper"),
    promoteType:
      localStorage.getItem("invitationtype") === ""
        ? "a"
        : localStorage.getItem("invitationtype"),
    prefill: !!(
      localStorage.getItem("upper") ||
      localStorage.getItem("promotionId") ||
      localStorage.getItem("invitationtype") !== ""
    ),
    fromCustomDomain: false,
    email: "",
  });

  // ===== formik =====
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchemaSpec),
    onSubmit: async (values) => {
      await handleClickRegister(values);
    },
  });

  const buttonText = i18n.t("common.register");
  return {
    formInputConfigList,
    formik,
    isLoading,
    buttonText,
  };
}
