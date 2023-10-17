import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "@/components/_Share_Domain/authentication/RegisterForm";
import Dialog from "@/components/UI/Dialog/Dialog";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const RegisterPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.register"));
  }, []);

  return <RegisterForm />;
};

export default RegisterPage;
