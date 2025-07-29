import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  CircularProgress,
  Grid,
} from "@mui/material";
import {
  CloudUpload,
  CloudDownload,
  Delete,
  Storage,
} from "@mui/icons-material";
import { backupData, restoreData, resetData } from "../services/api";
import { useNotification } from "../contexts/NotificationContext";

const BackupPage = () => {
  const [loading, setLoading] = useState({
    backup: false,
    restore: false,
    reset: false,
  });
  const { showNotification } = useNotification();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleBackup = async () => {
    try {
      setLoading((prev) => ({ ...prev, backup: true }));
      await backupData();
      showNotification("تم إنشاء نسخة احتياطية بنجاح", "success");
    } catch (error) {
      showNotification("فشل إنشاء نسخة احتياطية", "error");
    } finally {
      setLoading((prev) => ({ ...prev, backup: false }));
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleRestore = async () => {
    if (!selectedFile) {
      showNotification("الرجاء اختيار ملف النسخة الاحتياطية", "warning");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, restore: true }));
      await restoreData(selectedFile);
      showNotification("تم استعادة النسخة الاحتياطية بنجاح", "success");
      setSelectedFile(null);
    } catch (error) {
      showNotification("فشل استعادة النسخة الاحتياطية", "error");
    } finally {
      setLoading((prev) => ({ ...prev, restore: false }));
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "هل أنت متأكد من حذف جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه."
      )
    ) {
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, reset: true }));
      await resetData();
      showNotification("تم حذف جميع البيانات بنجاح", "success");
    } catch (error) {
      showNotification("فشل حذف البيانات", "error");
    } finally {
      setLoading((prev) => ({ ...prev, reset: false }));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        إدارة النسخ الاحتياطي
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إنشاء نسخة احتياطية
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                تصدير جميع بيانات النظام إلى ملف يمكن استعادته لاحقًا
              </Typography>
              <Button
                variant="contained"
                startIcon={
                  loading.backup ? (
                    <CircularProgress size={20} />
                  ) : (
                    <CloudUpload />
                  )
                }
                onClick={handleBackup}
                disabled={loading.backup}
                fullWidth
              >
                إنشاء نسخة احتياطية
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                استعادة نسخة احتياطية
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                استيراد بيانات النظام من ملف نسخة احتياطية سابقة
              </Typography>

              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              >
                {selectedFile
                  ? selectedFile.name
                  : "اختر ملف النسخة الاحتياطية"}
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".json"
                />
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={
                  loading.restore ? (
                    <CircularProgress size={20} />
                  ) : (
                    <CloudDownload />
                  )
                }
                onClick={handleRestore}
                disabled={loading.restore || !selectedFile}
                fullWidth
              >
                استعادة النسخة
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ borderColor: "error.main" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error">
                إعادة ضبط النظام
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                حذف جميع بيانات النظام وإعادته إلى الحالة الافتراضية
              </Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={
                  loading.reset ? <CircularProgress size={20} /> : <Delete />
                }
                onClick={handleReset}
                disabled={loading.reset}
                fullWidth
              >
                حذف جميع البيانات
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BackupPage;
