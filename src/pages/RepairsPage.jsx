import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import RepairList from "../components/repairs/RepairList";
import RepairForm from "../components/repairs/RepairForm";
import { getRepairs, deleteRepair, updateRepairStatus } from "../services/api";
import { useNotification } from "../contexts/NotificationContext";

const RepairsPage = () => {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentRepair, setCurrentRepair] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchRepairs();
  }, []);

  const fetchRepairs = async () => {
    try {
      setLoading(true);
      const data = await getRepairs();
      setRepairs(data);
    } catch (error) {
      showNotification("فشل تحميل بيانات الصيانات", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (repairId, newStatus) => {
    try {
      await updateRepairStatus(repairId, { status: newStatus });
      fetchRepairs();
      showNotification("تم تحديث حالة الصيانة بنجاح", "success");
    } catch (error) {
      showNotification("فشل تحديث حالة الصيانة", "error");
    }
  };

  const handleDelete = async (repairId) => {
    try {
      await deleteRepair(repairId);
      setRepairs(repairs.filter((r) => r._id !== repairId));
      showNotification("تم حذف الصيانة بنجاح", "success");
    } catch (error) {
      showNotification("فشل حذف الصيانة", "error");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {showForm ? (
        <RepairForm
          initialValues={currentRepair || {}}
          onSubmit={() => {
            fetchRepairs();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <RepairList
          repairs={repairs}
          loading={loading}
          onEdit={(repair) => {
            setCurrentRepair(repair);
            setShowForm(true);
          }}
          onStatusChange={handleStatusUpdate}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default RepairsPage;
