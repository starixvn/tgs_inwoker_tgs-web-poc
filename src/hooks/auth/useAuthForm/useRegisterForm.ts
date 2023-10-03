import { useCallback, useEffect, useMemo, useState } from "react";
import i18n from "@/utils/i18n";
import { FormikValues } from "formik";
import config from "@/config/config";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGenerateRegisterFormik } from "@/hooks/auth/useAuthForm/hooks/useGenerateRegisterFormik";

export function useRegisterForm() {
  const { handleRegister } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // ===== handle click register =====
  const handleClickRegister = useCallback(async (values: FormikValues) => {
    try {
      setIsLoading(true);
      console.log(values);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { formInputConfigList, formik } = useGenerateRegisterFormik({
    handleClickRegister,
  });

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
  });

  useEffect(() => {
    return () => {};
  }, []);

  return {
    formInputConfigList,
    formik,
    isLoading,
  };
}
