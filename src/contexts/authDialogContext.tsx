import React, { createContext, useCallback, useState } from "react";

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

  const handleToggleLoginDialog = useCallback(() => {
    setIsLoginDialogOpen((prevState) => !prevState);
  }, []);
  const handleToggleRegisterDialog = useCallback(() => {
    setIsRegisterDialogOpen((prevState) => !prevState);
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
