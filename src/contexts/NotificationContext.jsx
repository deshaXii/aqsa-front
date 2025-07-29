import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "info",
  });

  const showNotification = (message, type = "info", autoHide = 6000) => {
    setNotification({
      open: true,
      message,
      type,
      autoHide,
    });
  };

  const hideNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
