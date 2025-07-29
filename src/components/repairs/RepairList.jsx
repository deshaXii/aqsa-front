import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Paper,
  Pagination,
  Stack,
  Button,
  Tabs,
  Tab,
  MenuItem,
  Select,
} from "@mui/material";
import { Search, Clear, Add, FilterList } from "@mui/icons-material";
import RepairItem from "./RepairItem";
import LoadingSpinner from "../ui/LoadingSpinner";

const RepairList = ({
  repairs,
  onEdit,
  onStatusChange,
  loading,
  showCustomer = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [tabValue, setTabValue] = useState("all");
  const itemsPerPage = 10;

  const filteredRepairs = repairs.filter((repair) => {
    const matchesSearch =
      repair.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repair.customer?.phone?.includes(searchTerm) ||
      repair.fault?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repair.repairId && repair.repairId.toString().includes(searchTerm));

    const matchesStatus =
      statusFilter === "all" || repair.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const paginatedRepairs = filteredRepairs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setPage(1);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setStatusFilter(newValue === "all" ? "all" : newValue);
    setPage(1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (repairs.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="textSecondary">
          لا يوجد صيانات مسجلة
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="ابحث عن صيانة..."
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton onClick={clearSearch} size="small">
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
            startAdornment={
              <InputAdornment position="start">
                <FilterList fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="all">كل الحالات</MenuItem>
            <MenuItem value="pending">قيد الانتظار</MenuItem>
            <MenuItem value="in-progress">قيد الإصلاح</MenuItem>
            <MenuItem value="completed">مكتمل</MenuItem>
            <MenuItem value="delivered">تم التسليم</MenuItem>
          </Select>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => onEdit({})}
        >
          إضافة صيانة
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="الكل" value="all" />
        <Tab label="قيد الانتظار" value="pending" />
        <Tab label="قيد الإصلاح" value="in-progress" />
        <Tab label="مكتمل" value="completed" />
      </Tabs>

      {filteredRepairs.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            لا توجد نتائج للبحث
          </Typography>
        </Paper>
      ) : (
        <>
          {paginatedRepairs.map((repair) => (
            <RepairItem
              key={repair._id}
              repair={repair}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
            />
          ))}

          {filteredRepairs.length > itemsPerPage && (
            <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
              <Pagination
                count={Math.ceil(filteredRepairs.length / itemsPerPage)}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  );
};

export default RepairList;
