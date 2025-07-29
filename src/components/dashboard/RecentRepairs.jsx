import React from "react";
import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Avatar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/helpers";

const statusColors = {
  pending: "default",
  "in-progress": "info",
  completed: "success",
  delivered: "primary",
  cancelled: "error",
};

const RecentRepairs = ({ repairs }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        title="أحدث الصيانات"
        titleTypographyProps={{ variant: "h6" }}
        sx={{ bgcolor: "background.default" }}
      />
      <Divider />
      <Box sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>رقم الصيانة</TableCell>
              <TableCell>العميل</TableCell>
              <TableCell>الجهاز</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>التاريخ</TableCell>
              <TableCell>السعر</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary">
                    لا توجد صيانات حديثة
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              repairs.map((repair) => (
                <TableRow hover key={repair._id}>
                  <TableCell>
                    <Link
                      to={`/repairs/${repair._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="subtitle2" color="primary">
                        #{repair.repairId || repair._id.slice(-6)}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                        {repair.customer?.name?.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">
                        {repair.customer?.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {repair.deviceType === "mobile" && "موبايل"}
                      {repair.deviceType === "laptop" && "لابتوب"}
                      {repair.deviceType === "tablet" && "تابلت"}
                      {repair.deviceType === "desktop" && "كمبيوتر"}
                      {repair.deviceType === "other" && "أخرى"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        {
                          pending: "قيد الانتظار",
                          "in-progress": "قيد الإصلاح",
                          completed: "مكتمل",
                          delivered: "تم التسليم",
                          cancelled: "ملغى",
                        }[repair.status] || repair.status
                      }
                      size="small"
                      color={statusColors[repair.status]}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(repair.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {repair.price} ج.م
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default RecentRepairs;
