import React, { createContext, useCallback, useState } from "react";

export const initialState: {
  isOpen: boolean;
  title: string;
  message: string;
  action: string;
  alert: (title: string, message: string, action?: string) => void;
  closeAlertPopup: () => void;
} = {
  isOpen: false,
  title: "",
  message: "",
  action: "",
  alert: (title: string, message: string, action?: string) => {},
  closeAlertPopup: () => {},
};

export const NotificationContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const NotificationContextProvider = ({ children }: ProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [action, setAction] = useState<string>("");

  const showAlertPopup = useCallback(
    (title: string, message: string, action?: string) => {
      setIsOpen(true);
      setTitle(title);
      setMessage(message);
      setAction(action || "");
    },
    []
  );

  const closeAlertPopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        isOpen,
        title,
        message,
        action,
        alert: showAlertPopup,
        closeAlertPopup,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
