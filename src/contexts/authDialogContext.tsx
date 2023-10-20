import React, { createContext, useCallback, useState } from "react";
import { useLocation } from "react-router";
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
  const location = useLocation();
  const history = useHistory();

  const handleToggleLoginDialog = useCallback((isOpen?: boolean) => {
    if (typeof isOpen !== "undefined") {
      setIsLoginDialogOpen(isOpen);
      return;
    }

    setIsLoginDialogOpen((prevState) => !prevState);

    // if (location.pathname === "/login") {
    //   history.push("/");
    // }
  }, []);
  const handleToggleRegisterDialog = useCallback((isOpen?: boolean) => {
    if (typeof isOpen !== "undefined") {
      setIsRegisterDialogOpen(isOpen);
      return;
    }

    setIsRegisterDialogOpen((prevState) => !prevState);

    // if (location.pathname === "/register") {
    //   history.push("/");
    // }
  }, []);

  const handleToggleForgetPasswordDialog = useCallback((isOpen?: boolean) => {
    if (typeof isOpen !== "undefined") {
      setIsForgetPasswordDialogOpen(isOpen);
      return;
    }

    setIsForgetPasswordDialogOpen((prevState) => !prevState);

    // if (location.pathname === "/register") {
    //   history.push("/");
    // }
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
