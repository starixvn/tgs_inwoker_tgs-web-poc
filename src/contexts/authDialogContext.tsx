import React, { createContext, useCallback, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

export const initialState: {
  isLoginDialogOpen: boolean;
  isRegisterDialogOpen: boolean;
  handleToggleLoginDialog: () => void;
  handleToggleRegisterDialog: () => void;
} = {
  isLoginDialogOpen: false,
  isRegisterDialogOpen: false,
  handleToggleLoginDialog: () => {},
  handleToggleRegisterDialog: () => {},
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
  const location = useLocation();
  const history = useHistory();

  const handleToggleLoginDialog = useCallback(() => {
    setIsLoginDialogOpen((prevState) => !prevState);

    // if (location.pathname === "/login") {
    //   history.push("/");
    // }
  }, []);
  const handleToggleRegisterDialog = useCallback(() => {
    setIsRegisterDialogOpen((prevState) => !prevState);

    // if (location.pathname === "/register") {
    //   history.push("/");
    // }
  }, []);

  return (
    <AuthDialogContext.Provider
      value={{
        isLoginDialogOpen,
        isRegisterDialogOpen,
        handleToggleLoginDialog,
        handleToggleRegisterDialog,
      }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
};
