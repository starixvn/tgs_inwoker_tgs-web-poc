import React, { createContext, useCallback, useState } from "react";

export const initialState: {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  toggleLoginDialog: () => void;
  toggleRegisterDialog: () => void;
} = {
  isLoginOpen: false,
  isRegisterOpen: false,
  toggleLoginDialog: () => {},
  toggleRegisterDialog: () => {},
};

export const AuthDialogContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const AuthDialogContextProvider = ({ children }: ProviderProps) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleLoginDialog = useCallback(() => {
    setIsLoginOpen((prevState) => !prevState);
  }, []);

  const toggleRegisterDialog = useCallback(() => {
    setIsRegisterOpen((prevState) => !prevState);
  }, []);

  return (
    <AuthDialogContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        toggleLoginDialog,
        toggleRegisterDialog,
      }}
    >
      {children}
    </AuthDialogContext.Provider>
  );
};
