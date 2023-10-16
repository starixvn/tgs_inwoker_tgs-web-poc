import { useCallback, useEffect, useMemo, useState } from "react";
import { FormikValues } from "formik";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGenerateRegisterFormik } from "@/hooks/auth/useAuthForm/hooks/useGenerateRegisterFormik";
import { usePromotionCode } from "@/hooks/auth/useAuthForm/hooks/usePromotionCode";
import { useSnackbar } from "notistack";
import i18n from "@/utils/i18n";
import { useConfirmAdult } from "@/hooks/auth/useAuthForm/hooks/useConfirmAdult";

export enum UserTypeEnum {
  AGENT = "a",
  PLAYER = "p",
}
export function useRegisterForm() {
  const { registerState, handleRegister } = useAuth();
  const { promotionData } = usePromotionCode();
  const { isConfirmedAdult, handleClickConfirmAdult } = useConfirmAdult();
  const { enqueueSnackbar } = useSnackbar();

  // ===== handle click register =====
  const handleClickRegister = useCallback(
    async (values: FormikValues) => {
      if (!isConfirmedAdult) {
        enqueueSnackbar(i18n.t("common.msgRegisterTermAndCondition"), {
          variant: "warning",
        });
        return;
      }

      const userType = values.userType as UserTypeEnum;
      try {
        await handleRegister({
          username: values.username as string,
          pwd: values.password as string,
          confirmpwd: values.confirmpwd as string,
          upper: userType === UserTypeEnum.PLAYER ? promotionData.upper : "",
          invitationcode:
            userType === UserTypeEnum.AGENT ? promotionData.promoId : "",
        });
      } catch (error: any) {
        console.error(error);
        enqueueSnackbar(error.message, {
          variant: "warning",
        });
      }
    },
    [promotionData.promoId, isConfirmedAdult]
  );

  const { formInputConfigList, formik } = useGenerateRegisterFormik({
    handleClickSubmit: handleClickRegister,
  });

  return {
    formInputConfigList,
    formik,
    isLoading: registerState.isLoading,
    registerError: registerState.error,
    isConfirmedAdult,
    handleClickConfirmAdult,
  };
}
