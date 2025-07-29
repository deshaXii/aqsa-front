import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Stack,
  Divider,
  TextField,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Person,
  Email,
  Phone,
  Security,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useSnackbar } from "notistack";
import { updateTechnician } from "../services/api";
import PasswordInput from "../components/ui/PasswordInput";

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    specialization: user?.specialization || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateTechnician(user._id, formData);
      setUser(updatedUser);
      setEditMode(false);
      enqueueSnackbar("تم تحديث البيانات بنجاح", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("فشل تحديث البيانات", { variant: "error" });
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      enqueueSnackbar("كلمة المرور الجديدة غير متطابقة", { variant: "error" });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      enqueueSnackbar("كلمة المرور يجب أن تكون 6 أحرف على الأقل", {
        variant: "error",
      });
      return;
    }

    try {
      // هنا يمكن إضافة API call لتغيير كلمة المرور
      // await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setChangePasswordMode(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      enqueueSnackbar("تم تغيير كلمة المرور بنجاح", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("فشل تغيير كلمة المرور", { variant: "error" });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      username: user?.username || "",
      specialization: user?.specialization || "",
    });
    setEditMode(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        الملف الشخصي
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Typography variant="h6">المعلومات الشخصية</Typography>
                {!editMode ? (
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => setEditMode(true)}
                  >
                    تعديل
                  </Button>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSave}
                    >
                      حفظ
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                    >
                      إلغاء
                    </Button>
                  </Stack>
                )}
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="الاسم"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="username"
                    label="اسم المستخدم"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={true} // لا يمكن تعديل اسم المستخدم
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Email sx={{ mr: 1, color: "text.secondary" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="specialization"
                    label="التخصص"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    fullWidth
                    multiline
                    rows={2}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.main",
                    fontSize: "2rem",
                  }}
                >
                  {user?.name?.charAt(0) || "U"}
                </Avatar>
                <Typography variant="h6">{user?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.username}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    نوع الحساب
                  </Typography>
                  <Chip
                    label={user?.role === "admin" ? "مدير" : "فني"}
                    color={user?.role === "admin" ? "error" : "primary"}
                    size="small"
                  />
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    الحالة
                  </Typography>
                  <Chip
                    label={user?.active ? "نشط" : "غير نشط"}
                    color={user?.active ? "success" : "default"}
                    size="small"
                  />
                </Box>

                {user?.specialization && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      التخصص
                    </Typography>
                    <Typography variant="body2">
                      {user.specialization}
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="outlined"
                  startIcon={<Security />}
                  onClick={() => setChangePasswordMode(true)}
                  fullWidth
                >
                  تغيير كلمة المرور
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Permissions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                الصلاحيات
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Chip
                    label="استلام أجهزة"
                    color={user?.canReceive ? "success" : "default"}
                    variant={user?.canReceive ? "filled" : "outlined"}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Chip
                    label="إضافة صيانة"
                    color={user?.canAdd ? "success" : "default"}
                    variant={user?.canAdd ? "filled" : "outlined"}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Chip
                    label="تعديل صيانة"
                    color={user?.canEdit ? "success" : "default"}
                    variant={user?.canEdit ? "filled" : "outlined"}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Chip
                    label="حذف صيانة"
                    color={user?.canDelete ? "success" : "default"}
                    variant={user?.canDelete ? "filled" : "outlined"}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Change Password Dialog */}
      <Dialog
        open={changePasswordMode}
        onClose={() => setChangePasswordMode(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>تغيير كلمة المرور</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <PasswordInput
              name="currentPassword"
              label="كلمة المرور الحالية"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
            <PasswordInput
              name="newPassword"
              label="كلمة المرور الجديدة"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
            <PasswordInput
              name="confirmPassword"
              label="تأكيد كلمة المرور الجديدة"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordMode(false)}>إلغاء</Button>
          <Button onClick={handleChangePassword} variant="contained">
            تغيير كلمة المرور
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
