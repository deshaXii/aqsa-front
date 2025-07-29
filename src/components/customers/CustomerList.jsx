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
} from "@mui/material";
import { Search, Clear, Add } from "@mui/icons-material";
import CustomerItem from "./CustomerItem";
import LoadingSpinner from "../ui/LoadingSpinner";

const CustomerList = ({ customers, onEdit, onDelete, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  const paginatedCustomers = filteredCustomers.slice(
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

  if (customers.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="textSecondary">
          لا يوجد عملاء مسجلين
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <TextField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="ابحث عن عميل..."
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

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => onEdit({})}
        >
          عميل جديد
        </Button>
      </Box>

      {filteredCustomers.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="textSecondary">
            لا توجد نتائج للبحث
          </Typography>
        </Paper>
      ) : (
        <>
          {paginatedCustomers.map((customer) => (
            <CustomerItem
              key={customer._id}
              customer={customer}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}

          {filteredCustomers.length > itemsPerPage && (
            <Stack spacing={2} sx={{ mt: 3, alignItems: "center" }}>
              <Pagination
                count={Math.ceil(filteredCustomers.length / itemsPerPage)}
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

export default CustomerList;
