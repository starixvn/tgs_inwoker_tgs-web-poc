import React, { createContext, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

export const initialState: {
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;
  isForgetPasswordDialogOpen: boolean;
  handleToggleLoginDialog: (isOpen?: boolean) => void;
  handleToggleRegisterDialog: (isOpen?: boolean) => void;
  handleToggleForgetPasswordDialog: (isOpen?: boolean) => void;
} = {
  isLoginDialogOpen: false,
  isRegisterDialogOpen: false,
  isForgetPasswordDialogOpen: false,
  handleToggleLoginDialog: () => {},
  handleToggleRegisterDialog: () => {},
  handleToggleForgetPasswordDialog: () => {},
};

export const AuthDialogContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthDialogContextProvider = ({ children }: ProviderProps) => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isForgetPasswordDialogOpen, setIsForgetPasswordDialogOpen] =
    useState(false);
  const history = useHistory();

  const handleToggleLoginDialog = useCallback((isOpen?: boolean) => {
    if (typeof isOpen !== "undefined") {
      setIsLoginDialogOpen(isOpen);
    } else {
      setIsLoginDialogOpen((prevState) => !prevState);
    }

    if (location.pathname === "/login" && !isOpen) {
      history.push("/");
    }
  }, []);

  const handleToggleRegisterDialog = useCallback((isOpen?: boolean) => {
    if (typeof isOpen !== "undefined") {
      setIsRegisterDialogOpen(isOpen);
    } else {
      setIsRegisterDialogOpen((prevState) => !prevState);
    }

    if (location.pathname === "/register" && !isOpen) {
      history.push("/");
    }
  }, []);

  const handleToggleForgetPasswordDialog = useCallback((isOpen?: boolean) => {
    if (typeof isOpen !== "undefined") {
      setIsForgetPasswordDialogOpen(isOpen);
    } else {
      setIsForgetPasswordDialogOpen((prevState) => !prevState);
    }

    if (location.pathname === "/forgot-password" && !isOpen) {
      history.push("/");
    }
  }, []);

  return (
    <AuthDialogContext.Provider
      value={{
        isLoginDialogOpen,
        isRegisterDialogOpen,
        isForgetPasswordDialogOpen,
        handleToggleLoginDialog,
        handleToggleRegisterDialog,
        handleToggleForgetPasswordDialog,
      }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
};
