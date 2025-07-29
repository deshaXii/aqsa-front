import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import CustomerList from "../components/customers/CustomerList";
import CustomerForm from "../components/customers/CustomerForm";
import { getCustomers, deleteCustomer } from "../services/api";
import { useNotification } from "../contexts/NotificationContext";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      showNotification("فشل تحميل بيانات العملاء", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      setCustomers(customers.filter((c) => c._id !== customerId));
      showNotification("تم حذف العميل بنجاح", "success");
    } catch (error) {
      showNotification("فشل حذف العميل", "error");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {showForm ? (
        <CustomerForm
          initialValues={currentCustomer || {}}
          onSubmit={() => {
            fetchCustomers();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <CustomerList
          customers={customers}
          loading={loading}
          onEdit={(customer) => {
            setCurrentCustomer(customer);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default CustomersPage;
