import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  TextField,
  Alert,
  Chip,
} from "@mui/material";
import {
  Notifications,
  Security,
  Palette,
  Language,
  Save,
  Refresh,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

const SettingsPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
    appearance: {
      theme: "light",
      language: "ar",
      fontSize: "medium",
    },
    system: {
      autoBackup: true,
      backupFrequency: "daily",
      maxBackups: 10,
    },
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSave = () => {
    // هنا يمكن حفظ الإعدادات في localStorage أو إرسالها للسيرفر
    localStorage.setItem("app_settings", JSON.stringify(settings));
    enqueueSnackbar("تم حفظ الإعدادات بنجاح", { variant: "success" });
  };

  const handleReset = () => {
    const defaultSettings = {
      notifications: {
        email: true,
        push: false,
        sms: false,
      },
      security: {
        twoFactor: false,
        sessionTimeout: 30,
        passwordExpiry: 90,
      },
      appearance: {
        theme: "light",
        language: "ar",
        fontSize: "medium",
      },
      system: {
        autoBackup: true,
        backupFrequency: "daily",
        maxBackups: 10,
      },
    };
    setSettings(defaultSettings);
    enqueueSnackbar("تم إعادة تعيين الإعدادات", { variant: "info" });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        الإعدادات
      </Typography>

      <Grid container spacing={3}>
        {/* Notifications Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Notifications color="primary" />
                <Typography variant="h6">الإشعارات</Typography>
              </Stack>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.email}
                      onChange={(e) =>
                        handleSettingChange(
                          "notifications",
                          "email",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="إشعارات البريد الإلكتروني"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.push}
                      onChange={(e) =>
                        handleSettingChange(
                          "notifications",
                          "push",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="الإشعارات الفورية"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.sms}
                      onChange={(e) =>
                        handleSettingChange(
                          "notifications",
                          "sms",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="رسائل SMS"
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Security color="primary" />
                <Typography variant="h6">الأمان</Typography>
              </Stack>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.security.twoFactor}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "twoFactor",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="المصادقة الثنائية"
                />
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    مهلة الجلسة (دقائق)
                  </Typography>
                  <TextField
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      handleSettingChange(
                        "security",
                        "sessionTimeout",
                        parseInt(e.target.value)
                      )
                    }
                    size="small"
                    sx={{ width: 120 }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    انتهاء صلاحية كلمة المرور (أيام)
                  </Typography>
                  <TextField
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) =>
                      handleSettingChange(
                        "security",
                        "passwordExpiry",
                        parseInt(e.target.value)
                      )
                    }
                    size="small"
                    sx={{ width: 120 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Palette color="primary" />
                <Typography variant="h6">المظهر</Typography>
              </Stack>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    المظهر
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label="فاتح"
                      color={
                        settings.appearance.theme === "light"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange("appearance", "theme", "light")
                      }
                      clickable
                    />
                    <Chip
                      label="داكن"
                      color={
                        settings.appearance.theme === "dark"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange("appearance", "theme", "dark")
                      }
                      clickable
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    اللغة
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label="العربية"
                      color={
                        settings.appearance.language === "ar"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange("appearance", "language", "ar")
                      }
                      clickable
                    />
                    <Chip
                      label="English"
                      color={
                        settings.appearance.language === "en"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange("appearance", "language", "en")
                      }
                      clickable
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    حجم الخط
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label="صغير"
                      color={
                        settings.appearance.fontSize === "small"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange("appearance", "fontSize", "small")
                      }
                      clickable
                    />
                    <Chip
                      label="متوسط"
                      color={
                        settings.appearance.fontSize === "medium"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange("appearance", "fontSize", "medium")
                      }
                      clickable
                    />
                    <Chip
                      label="كبير"
                      color={
                        settings.appearance.fontSize === "large"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange("appearance", "fontSize", "large")
                      }
                      clickable
                    />
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Language color="primary" />
                <Typography variant="h6">النظام</Typography>
              </Stack>
              <Divider sx={{ mb: 3 }} />

              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.system.autoBackup}
                      onChange={(e) =>
                        handleSettingChange(
                          "system",
                          "autoBackup",
                          e.target.checked
                        )
                      }
                    />
                  }
                  label="النسخ الاحتياطي التلقائي"
                />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    تكرار النسخ الاحتياطي
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label="يومي"
                      color={
                        settings.system.backupFrequency === "daily"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange(
                          "system",
                          "backupFrequency",
                          "daily"
                        )
                      }
                      clickable
                    />
                    <Chip
                      label="أسبوعي"
                      color={
                        settings.system.backupFrequency === "weekly"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange(
                          "system",
                          "backupFrequency",
                          "weekly"
                        )
                      }
                      clickable
                    />
                    <Chip
                      label="شهري"
                      color={
                        settings.system.backupFrequency === "monthly"
                          ? "primary"
                          : "default"
                      }
                      onClick={() =>
                        handleSettingChange(
                          "system",
                          "backupFrequency",
                          "monthly"
                        )
                      }
                      clickable
                    />
                  </Stack>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    الحد الأقصى للنسخ الاحتياطية
                  </Typography>
                  <TextField
                    type="number"
                    value={settings.system.maxBackups}
                    onChange={(e) =>
                      handleSettingChange(
                        "system",
                        "maxBackups",
                        parseInt(e.target.value)
                      )
                    }
                    size="small"
                    sx={{ width: 120 }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  size="large"
                >
                  حفظ الإعدادات
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={handleReset}
                  size="large"
                >
                  إعادة تعيين
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          بعض الإعدادات قد تتطلب إعادة تشغيل التطبيق لتطبيقها بشكل كامل.
        </Typography>
      </Alert>
    </Box>
  );
};

export default SettingsPage;
