import React, { createContext } from "react";
import { LoginState, useLogin } from "@/hooks/auth/useAuth/useLogin";
import { LogoutState, useLogout } from "@/hooks/auth/useAuth/useLogout";
import { RegisterState, useRegister } from "@/hooks/auth/useAuth/useRegister";
import Register from "@/components/App/Register";
import { useAccountStore } from "@/hooks/stores/useAccountStore";
import { RegisterReqDto } from "@/models/dto/player/RegisterReqDto";

export const initialState: {
  loginState: LoginState;
  logoutState: LogoutState;
  registerState: RegisterState;
  handleLogin: (
    username: string,
    password: string,
    needToRemember?: boolean
  ) => Promise<void>;
  handleLogout: () => void;
  handleRegister: (registerReqDto: RegisterReqDto) => void;
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
  handleLogin: (username: string, password: string, needToRemember?: boolean) =>
    Promise.resolve(),
  handleLogout: () => {},
  handleRegister: () => {},
  isLogin: false,
};

export const AuthContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: ProviderProps) => {
  const { loginState, handleLogin } = useLogin();
  const { logoutState, handleLogout } = useLogout();
  const { registerState, handleRegister } = useRegister();
  const { account } = useAccountStore();

  const isLogin = !!account.token;

  return (
    <AuthContext.Provider
      value={{
        loginState,
        handleLogin,
        logoutState,
        handleLogout,
        registerState,
        handleRegister,
        isLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
