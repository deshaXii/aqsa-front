import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ar } from "date-fns/locale";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import Header from "./components/ui/Header";
import Sidebar from "./components/ui/Sidebar";
import Notification from "./components/ui/Notification";
import AppRoutes from "./routes";
import "./App.css";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#2E7D32", // Green
    },
    secondary: {
      main: "#1565C0", // Blue
    },
  },
  typography: {
    fontFamily: '"Tajawal", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
  },
});

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ar}>
        <NotificationProvider>
          <AuthProvider>
            <Router>
              <div className="app-container">
                <CssBaseline />
                <Header onToggleSidebar={handleDrawerToggle} />
                <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
                <main className="main-content">
                  <AppRoutes />
                </main>
                <Notification />
              </div>
            </Router>
          </AuthProvider>
        </NotificationProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
