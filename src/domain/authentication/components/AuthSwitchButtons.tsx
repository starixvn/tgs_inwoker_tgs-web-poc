import React from "react";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import { useAuthDialog } from "@/hooks/auth/useAuthDialog";

const AuthSwitchButtonsContainer = styled.div`
  display: flex;
  margin: 42px 40px 0;
`;

type SwitchButtonProps = {
  $isActive: boolean;
};
const SwitchButton = styled.div<SwitchButtonProps>`
  background: ${({ $isActive, theme }: SwitchButtonProps) =>
    $isActive ? theme.primary : "none"};
  color: ${({ $isActive, theme }: SwitchButtonProps) =>
    $isActive ? theme.white : theme.tertiary};
  padding: 5px;
  width: 139px;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.465rem;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
`;

type Props = {
  activeAuthStep: "login" | "register";
};
const AuthSwitchButtons = ({ activeAuthStep }: Props) => {
  const { handleToggleLoginDialog, handleToggleRegisterDialog } =
    useAuthDialog();

  const handleLogin = () => {
    if (activeAuthStep === "login") return;

    handleToggleLoginDialog(false);
    handleToggleRegisterDialog(true);
  };

  const handleRegister = () => {
    if (activeAuthStep === "register") return;

    handleToggleRegisterDialog(false);
    handleToggleLoginDialog(true);
  };

  return (
    <AuthSwitchButtonsContainer>
      <SwitchButton
        onClick={handleLogin}
        $isActive={activeAuthStep === "login"}
      >
        {i18n.t("common.login")}
      </SwitchButton>
      <SwitchButton
        onClick={handleRegister}
        $isActive={activeAuthStep === "register"}
      >
        {i18n.t("common.register")}
      </SwitchButton>
    </AuthSwitchButtonsContainer>
  );
};

export default AuthSwitchButtons;
