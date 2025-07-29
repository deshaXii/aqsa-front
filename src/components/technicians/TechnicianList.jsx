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
  Chip,
} from "@mui/material";
import { Search, Clear, Add, FilterList } from "@mui/icons-material";
import TechnicianItem from "./TechnicianItem";
import LoadingSpinner from "../ui/LoadingSpinner";

const TechnicianList = ({ technicians, onEdit, onStatusChange, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 10;

  const filteredTechnicians = technicians.filter((technician) => {
    const matchesSearch =
      technician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technician.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (technician.specialization &&
        technician.specialization
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && technician.active) ||
      (statusFilter === "inactive" && !technician.active);

    return matchesSearch && matchesStatus;
  });

  const paginatedTechnicians = filteredTechnicians.slice(
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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (technicians.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="textSecondary">
          لا يوجد فنيين مسجلين
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => onEdit({})}
          sx={{ mt: 2 }}
        >
          إضافة فني جديد
        </Button>
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
            placeholder="ابحث عن فني..."
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

          <Chip
            label={
              statusFilter === "all"
                ? "الكل"
                : statusFilter === "active"
                ? "المفعلين فقط"
                : "المعطلين فقط"
            }
            icon={<FilterList fontSize="small" />}
            onClick={() =>
              setStatusFilter(
                statusFilter === "all"
                  ? "active"
                  : statusFilter === "active"
                  ? "inactive"
                  : "all"
              )
            }
            variant="outlined"
            color={
              statusFilter === "all"
                ? "default"
                : statusFilter === "active"
                ? "success"
                : "error"
            }
          />
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => onEdit({})}
        >
          إضافة فني جديد
        </Button>
      </Box>

      <Tabs
        value={statusFilter}
        onChange={(e, newValue) => setStatusFilter(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="الكل" value="all" />
        <Tab label="المفعلين" value="active" />
        <Tab label="المعطلين" value="inactive" />
      </Tabs>

      {filteredTechnicians.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            لا توجد نتائج للبحث
          </Typography>
        </Paper>
      ) : (
        <>
          {paginatedTechnicians.map((technician) => (
            <TechnicianItem
              key={technician._id}
              technician={technician}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
            />
          ))}

          {filteredTechnicians.length > itemsPerPage && (
            <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
              <Pagination
                count={Math.ceil(filteredTechnicians.length / itemsPerPage)}
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

export default TechnicianList;
