import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
  Toolbar,
  Divider,
  Box,
  Typography,
} from "@mui/material";

import {
  Dashboard,
  People,
  Build,
  Settings,
  Backup,
  ExpandLess,
  ExpandMore,
  StarBorder,
  Person,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = ({ mobileOpen, onClose }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      text: "لوحة التحكم",
      icon: <Dashboard />,
      path: "/",
      permission: true,
    },
    {
      text: "العملاء",
      icon: <People />,
      path: "/customers",
      permission: true,
    },
    {
      text: "الصيانات",
      icon: <Build />,
      path: "/repairs",
      permission: user?.canAdd || user?.canEdit || user?.canDelete,
    },
    {
      text: "الفنيون",
      icon: <People />,
      path: "/technicians",
      permission: user?.isAdmin,
    },
    {
      text: "النسخ الاحتياطي",
      icon: <Backup />,
      path: "/backup",
      permission: user?.isAdmin,
    },
    {
      text: "الملف الشخصي",
      icon: <Person />,
      path: "/profile",
      permission: true,
    },
    {
      text: "الإعدادات",
      icon: <Settings />,
      path: "/settings",
      permission: user?.isAdmin,
    },
  ];

  const handleClick = () => {
    setOpen(!open);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            <Box component="span" sx={{ color: "primary.main" }}>
              الأقصى
            </Box>{" "}
            ستور
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems
          .filter((item) => item.permission)
          .map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                bgcolor:
                  location.pathname === item.path
                    ? "action.selected"
                    : "inherit",
              }}
            >
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: 240 },
        flexShrink: { md: 0 },
      }}
    >
      {/* Sidebar for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: 240,
            right: "0",
            borderLeft: "1px solid #e0e0e0",
            boxSizing: "border-box",
            borderRight: "none",
            bgcolor: "background.default",
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Sidebar for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            right: "0",
            boxSizing: "border-box",
            bgcolor: "background.default",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
