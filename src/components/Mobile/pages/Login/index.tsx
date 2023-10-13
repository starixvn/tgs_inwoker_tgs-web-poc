import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dialog from "@/components/Mobile/components/UI/Dialog/Dialog";
import LoginForm from "@/components/_Share_Domain/authentication/LoginForm";
import { usePageName } from "@/hooks/usePageName";
import i18n from "@/utils/i18n";

type Props = {};
const LoginPage = (props: Props) => {
  const { updatePageName } = usePageName();

  useEffect(() => {
    updatePageName(i18n.t("common.login"));
  }, []);

  return <LoginForm />;
};

export default LoginPage;
