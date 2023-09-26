import React, { createContext } from "react";
import { LoginState, useLogin } from "@/hooks/auth/useAuth/useLogin";
import { LogoutState, useLogout } from "@/hooks/auth/useAuth/useLogout";
import { RegisterState, useRegister } from "@/hooks/auth/useAuth/useRegister";
import Register from "@/components/App/Register";
import { useAccountStore } from "@/hooks/stores/useAccountStore";

export const initialState: {
  loginState: LoginState;
  logoutState: LogoutState;
  registerState: RegisterState;
  handleClickLogin: (
    username: string,
    password: string,
    needToRemember?: boolean
  ) => Promise<void>;
  handleClickLogout: () => void;
  handleClickRegister: () => void;
  isLogin: boolean;
} = {
  loginState: {
    data: null,
    isLoading: false,
    error: null,
  },
  logoutState: {
    data: null,
    isLoading: false,
    error: null,
  },
  registerState: {
    data: null,
    isLoading: false,
    error: null,
  },
  handleClickLogin: (
    username: string,
    password: string,
    needToRemember?: boolean
  ) => Promise.resolve(),
  handleClickLogout: () => {},
  handleClickRegister: () => {},
  isLogin: false,
};

export const AuthContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const { loginState, handleClickLogin } = useLogin();
  const { logoutState, handleClickLogout } = useLogout();
  const { registerState, handleClickRegister } = useRegister();
  const { account } = useAccountStore();

  const isLogin = !!account.token;

  return (
    <AuthContext.Provider
      value={{
        loginState,
        handleClickLogin,
        logoutState,
        handleClickLogout,
        registerState,
        handleClickRegister,
        isLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
