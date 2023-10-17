import React, { createContext, useCallback, useState } from "react";

export const DRAWER_WIDTH = "259px";

export const initialState: {
  isMenuOpen: boolean;
  handleToggleMenu: (newIsOpen?: boolean) => void;
} = {
  isMenuOpen: false,
  handleToggleMenu: () => {},
};

export const HeaderContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const HeaderContextProvider = ({ children }: ProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = (newIsOpen?: boolean) => {
    if (typeof newIsOpen !== "undefined") {
      setIsMenuOpen(false);
      return;
    }

    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <HeaderContext.Provider
      value={{
        isMenuOpen,
        handleToggleMenu,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
