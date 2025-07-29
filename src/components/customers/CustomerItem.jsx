import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { Edit, Phone, WhatsApp, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { deleteCustomer } from "../../services/api";

const CustomerItem = ({ customer, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      await deleteCustomer(customer._id);
      enqueueSnackbar("تم حذف العميل بنجاح", { variant: "success" });
      onDelete(customer._id);
    } catch (error) {
      enqueueSnackbar("فشل حذف العميل", { variant: "error" });
    }
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${customer.phone}`, "_blank");
  };

  const handleCallClick = () => {
    window.open(`tel:${customer.phone}`, "_blank");
  };

  const handleRepairsClick = () => {
    navigate(`/customers/${customer._id}/repairs`);
  };

  return (
    <Card sx={{ mb: 2, borderLeft: 4, borderColor: "primary.main" }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <div>
            <Typography variant="h6" gutterBottom>
              {customer.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              <Phone
                fontSize="small"
                sx={{ verticalAlign: "middle", mr: 0.5 }}
              />
              {customer.phone}
            </Typography>
            {customer.address && (
              <Typography variant="body2" color="text.secondary">
                {customer.address}
              </Typography>
            )}
          </div>

          <Chip
            label={
              customer.customerType === "wholesale"
                ? "موزع"
                : customer.customerType === "company"
                  ? "شركة"
                  : "عميل"
            }
            size="small"
            color={
              customer.customerType === "wholesale"
                ? "secondary"
                : customer.customerType === "company"
                  ? "info"
                  : "default"
            }
            sx={{ mb: 1 }}
          />
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Tooltip title="إجراء مكالمة">
            <IconButton color="primary" onClick={handleCallClick}>
              <Phone fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="واتساب">
            <IconButton color="success" onClick={handleWhatsAppClick}>
              <WhatsApp fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="عرض الصيانات">
            <Button
              variant="outlined"
              size="small"
              onClick={handleRepairsClick}
              sx={{ ml: 1 }}
            >
              الصيانات
            </Button>
          </Tooltip>

          <Tooltip title="تعديل">
            <IconButton color="info" onClick={() => onEdit(customer)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="حذف">
            <IconButton color="error" onClick={handleDelete}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CustomerItem;
