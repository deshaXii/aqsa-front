import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import {
  Edit,
  Phone,
  WhatsApp,
  Delete,
  CheckCircle,
  LocalShipping,
  Cancel,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { deleteRepair, updateRepairStatus } from "../../services/api";
import { formatDate, formatCurrency } from "../../utils/helpers";

const statusConfig = {
  pending: {
    color: "default",
    label: "قيد الانتظار",
    icon: <Cancel color="inherit" />,
  },
  "in-progress": {
    color: "info",
    label: "قيد الإصلاح",
    icon: <Edit color="inherit" />,
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

const RepairItem = ({ repair, onEdit, onStatusChange }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      await deleteRepair(repair._id);
      enqueueSnackbar("تم حذف الصيانة بنجاح", { variant: "success" });
      onStatusChange();
    } catch (error) {
      enqueueSnackbar("فشل حذف الصيانة", { variant: "error" });
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateRepairStatus(repair._id, { status: newStatus });
      enqueueSnackbar(
        `تم تحديث حالة الصيانة إلى ${statusConfig[newStatus].label}`,
        { variant: "success" }
      );
      onStatusChange();
    } catch (error) {
      enqueueSnackbar("فشل تحديث حالة الصيانة", { variant: "error" });
    }
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${repair.customer?.phone}`, "_blank");
  };

  const handleCallClick = () => {
    window.open(`tel:${repair.customer?.phone}`, "_blank");
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: 4,
        borderColor: `${statusConfig[repair.status].color}.main`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 2,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Box sx={{ flex: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                #{repair.repairId || repair._id.slice(-6)}
              </Typography>
              <Chip
                label={statusConfig[repair.status].label}
                color={statusConfig[repair.status].color}
                size="small"
                icon={statusConfig[repair.status].icon}
              />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>العميل:</strong> {repair.customer?.name}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>الجهاز:</strong>
              {repair.deviceType === "mobile" && " موبايل"}
              {repair.deviceType === "laptop" && " لابتوب"}
              {repair.deviceType === "tablet" && " تابلت"}
              {repair.deviceType === "desktop" && " كمبيوتر"}
              {repair.deviceType === "other" && " أخرى"} - {repair.color}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>العطل:</strong> {repair.fault}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              <strong>التاريخ:</strong> {formatDate(repair.createdAt)}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
              {formatCurrency(repair.price)}
            </Typography>
            {repair.profit && (
              <Typography variant="body2" color="success.main">
                الربح: {formatCurrency(repair.profit)}
              </Typography>
            )}
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 2, justifyContent: "space-between" }}
        >
          <Box>
            {repair.status === "pending" && (
              <Button
                variant="outlined"
                size="small"
                color="info"
                onClick={() => handleStatusUpdate("in-progress")}
                sx={{ mr: 1 }}
              >
                بدء الإصلاح
              </Button>
            )}
            {repair.status === "in-progress" && (
              <Button
                variant="outlined"
                size="small"
                color="success"
                onClick={() => handleStatusUpdate("completed")}
                sx={{ mr: 1 }}
              >
                إكمال الصيانة
              </Button>
            )}
            {repair.status === "completed" && (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => handleStatusUpdate("delivered")}
                sx={{ mr: 1 }}
              >
                تسليم العميل
              </Button>
            )}
          </Box>

          <Box>
            <Tooltip title="واتساب العميل">
              <IconButton
                color="success"
                size="small"
                onClick={handleWhatsAppClick}
              >
                <WhatsApp fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="اتصال بالعميل">
              <IconButton
                color="primary"
                size="small"
                onClick={handleCallClick}
              >
                <Phone fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="تعديل الصيانة">
              <IconButton
                color="info"
                size="small"
                onClick={() => onEdit(repair)}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="حذف الصيانة">
              <IconButton color="error" size="small" onClick={handleDelete}>
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RepairItem;
