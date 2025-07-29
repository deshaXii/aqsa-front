import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";
import { useNotification } from "../../contexts/NotificationContext";

const Notification = () => {
  const { notification, hideNotification } = useNotification();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    hideNotification();
  };

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={notification.autoHide || 6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      TransitionComponent={Slide}
    >
      <Alert
        onClose={handleClose}
        severity={notification.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
