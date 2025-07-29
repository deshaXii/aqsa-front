import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ArrowBack,
  Edit,
  Phone,
  WhatsApp,
  CheckCircle,
  LocalShipping,
  Cancel,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getRepair, updateRepairStatus } from "../services/api";
import { formatDate, formatCurrency } from "../utils/helpers";
import RepairForm from "../components/repairs/RepairForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const statusConfig = {
  pending: {
    color: "default",
    label: "قيد الانتظار",
    icon: <Cancel color="inherit" />,
  },
  "in-progress": {
    color: "info",
    label: "قيد الإصلاح",
    icon: <EditIcon color="inherit" />,
  },
  completed: {
    color: "success",
    label: "مكتمل",
    icon: <CheckCircle color="inherit" />,
  },
  delivered: {
    color: "primary",
    label: "تم التسليم",
    icon: <LocalShipping color="inherit" />,
  },
  cancelled: {
    color: "error",
    label: "ملغى",
    icon: <Cancel color="inherit" />,
  },
};

const RepairDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [repair, setRepair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchRepair();
  }, [id]);

  const fetchRepair = async () => {
    try {
      setLoading(true);
      const repairData = await getRepair(id);
      setRepair(repairData);
    } catch (error) {
      enqueueSnackbar("فشل تحميل بيانات الصيانة", { variant: "error" });
      navigate("/repairs");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateRepairStatus(id, { status: newStatus });
      enqueueSnackbar(
        `تم تحديث حالة الصيانة إلى ${statusConfig[newStatus].label}`,
        { variant: "success" }
      );
      fetchRepair();
    } catch (error) {
      enqueueSnackbar("فشل تحديث حالة الصيانة", { variant: "error" });
    }
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${repair?.customer?.phone}`, "_blank");
  };

  const handleCallClick = () => {
    window.open(`tel:${repair?.customer?.phone}`, "_blank");
  };

  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    fetchRepair();
    enqueueSnackbar("تم تحديث بيانات الصيانة بنجاح", { variant: "success" });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!repair) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          لم يتم العثور على الصيانة
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <IconButton onClick={() => navigate("/repairs")}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5">
          تفاصيل الصيانة #{repair.repairId || repair._id.slice(-6)}
        </Typography>
        <Chip
          label={statusConfig[repair.status].label}
          color={statusConfig[repair.status].color}
          icon={statusConfig[repair.status].icon}
        />
      </Stack>

      <Grid container spacing={3}>
        {/* Customer Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                معلومات العميل
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    الاسم
                  </Typography>
                  <Typography variant="body1">
                    {repair.customer?.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    رقم الهاتف
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body1">
                      {repair.customer?.phone}
                    </Typography>
                    <Tooltip title="واتساب">
                      <IconButton
                        color="success"
                        size="small"
                        onClick={handleWhatsAppClick}
                      >
                        <WhatsApp fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="اتصال">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={handleCallClick}
                      >
                        <Phone fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
                {repair.customer?.address && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      العنوان
                    </Typography>
                    <Typography variant="body1">
                      {repair.customer.address}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Device Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                معلومات الجهاز
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    نوع الجهاز
                  </Typography>
                  <Typography variant="body1">
                    {repair.deviceType === "mobile" && "موبايل"}
                    {repair.deviceType === "laptop" && "لابتوب"}
                    {repair.deviceType === "tablet" && "تابلت"}
                    {repair.deviceType === "desktop" && "كمبيوتر"}
                    {repair.deviceType === "other" && "أخرى"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    اللون
                  </Typography>
                  <Typography variant="body1">{repair.color}</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    العطل
                  </Typography>
                  <Typography variant="body1">{repair.fault}</Typography>
                </Box>
                {repair.notes && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      ملاحظات
                    </Typography>
                    <Typography variant="body1">{repair.notes}</Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Financial Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                المعلومات المالية
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    السعر
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {formatCurrency(repair.price)}
                  </Typography>
                </Box>
                {repair.profit && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      الربح
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      {formatCurrency(repair.profit)}
                    </Typography>
                  </Box>
                )}
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    تاريخ الاستلام
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(repair.createdAt)}
                  </Typography>
                </Box>
                {repair.completedAt && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      تاريخ الإكمال
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(repair.completedAt)}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                الإجراءات
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => setEditDialogOpen(true)}
                  fullWidth
                >
                  تعديل الصيانة
                </Button>

                {repair.status === "pending" && (
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => handleStatusUpdate("in-progress")}
                    fullWidth
                  >
                    بدء الإصلاح
                  </Button>
                )}

                {repair.status === "in-progress" && (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleStatusUpdate("completed")}
                    fullWidth
                  >
                    إكمال الصيانة
                  </Button>
                )}

                {repair.status === "completed" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStatusUpdate("delivered")}
                    fullWidth
                  >
                    تسليم العميل
                  </Button>
                )}

                {repair.status !== "delivered" &&
                  repair.status !== "cancelled" && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleStatusUpdate("cancelled")}
                      fullWidth
                    >
                      إلغاء الصيانة
                    </Button>
                  )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>تعديل الصيانة</DialogTitle>
        <DialogContent>
          <RepairForm
            initialValues={repair}
            onSubmit={handleEditSuccess}
            onCancel={() => setEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RepairDetailPage;
