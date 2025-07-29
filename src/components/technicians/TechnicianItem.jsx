import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  IconButton,
  Avatar,
  Box,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, LockReset, PersonOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { deleteTechnician, toggleTechnicianStatus } from "../../services/api";

const TechnicianItem = ({ technician, onEdit, onStatusChange }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    try {
      await deleteTechnician(technician._id);
      enqueueSnackbar("تم حذف الفني بنجاح", { variant: "success" });
      onStatusChange();
    } catch (error) {
      enqueueSnackbar("فشل حذف الفني", { variant: "error" });
    }
  };

  const handleToggleStatus = async () => {
    try {
      await toggleTechnicianStatus(technician._id, !technician.active);
      enqueueSnackbar(
        technician.active ? "تم تعطيل الحساب بنجاح" : "تم تفعيل الحساب بنجاح",
        { variant: "success" }
      );
      onStatusChange();
    } catch (error) {
      enqueueSnackbar("فشل تغيير حالة الحساب", { variant: "error" });
    }
  };

  const getPermissionsText = () => {
    const permissions = [];
    if (technician.canReceive) permissions.push("استلام");
    if (technician.canAdd) permissions.push("إضافة");
    if (technician.canEdit) permissions.push("تعديل");
    if (technician.canDelete) permissions.push("حذف");
    if (technician.isAdmin) permissions.push("مدير");

    return permissions.join("، ") || "لا يوجد صلاحيات";
  };

  return (
    <Card
      sx={{
        mb: 2,
        opacity: technician.active ? 1 : 0.8,
        borderLeft: 4,
        borderColor: technician.isAdmin
          ? "secondary.main"
          : technician.active
          ? "primary.main"
          : "error.main",
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: technician.isAdmin ? "secondary.main" : "primary.main",
            }}
          >
            {technician.name.charAt(0)}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" component="div">
                {technician.name}
              </Typography>
              <Chip
                label={technician.active ? "مفعل" : "معطل"}
                color={technician.active ? "success" : "error"}
                size="small"
              />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <strong>اسم المستخدم:</strong> {technician.username}
            </Typography>

            {technician.specialization && (
              <Typography variant="body2" color="text.secondary">
                <strong>التخصص:</strong> {technician.specialization}
              </Typography>
            )}

            <Typography variant="body2" color="text.secondary">
              <strong>الصلاحيات:</strong> {getPermissionsText()}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 2, justifyContent: "flex-end" }}
        >
          <Tooltip title="إعادة تعيين كلمة المرور">
            <IconButton color="warning">
              <LockReset />
            </IconButton>
          </Tooltip>

          <Tooltip title={technician.active ? "تعطيل الحساب" : "تفعيل الحساب"}>
            <IconButton
              color={technician.active ? "default" : "success"}
              onClick={handleToggleStatus}
            >
              <PersonOff />
            </IconButton>
          </Tooltip>

          <Tooltip title="تعديل">
            <IconButton color="info" onClick={() => onEdit(technician)}>
              <Edit />
            </IconButton>
          </Tooltip>

          {!technician.isAdmin && (
            <Tooltip title="حذف">
              <IconButton color="error" onClick={handleDelete}>
                <Delete />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TechnicianItem;
