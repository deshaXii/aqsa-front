import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import TechnicianList from "../components/technicians/TechnicianList";
import TechnicianForm from "../components/technicians/TechnicianForm";
import {
  getTechnicians,
  deleteTechnician,
  toggleTechnicianStatus,
} from "../services/api";
import { useNotification } from "../contexts/NotificationContext";
import { useAuth } from "../contexts/AuthContext";

const TechniciansPage = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentTechnician, setCurrentTechnician] = useState(null);
  const { showNotification } = useNotification();
  const { user } = useAuth();

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    try {
      setLoading(true);
      const data = await getTechnicians();
      setTechnicians(data);
    } catch (error) {
      showNotification("فشل تحميل بيانات الفنيين", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (technicianId, isActive) => {
    try {
      await toggleTechnicianStatus(technicianId, isActive);
      fetchTechnicians();
      showNotification(
        isActive ? "تم تفعيل الحساب بنجاح" : "تم تعطيل الحساب بنجاح",
        "success"
      );
    } catch (error) {
      showNotification("فشل تغيير حالة الحساب", "error");
    }
  };

  const handleDelete = async (technicianId) => {
    try {
      await deleteTechnician(technicianId);
      setTechnicians(technicians.filter((t) => t._id !== technicianId));
      showNotification("تم حذف الفني بنجاح", "success");
    } catch (error) {
      showNotification("فشل حذف الفني", "error");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {showForm ? (
        <TechnicianForm
          initialValues={currentTechnician || {}}
          onSubmit={() => {
            fetchTechnicians();
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <TechnicianList
          technicians={technicians}
          loading={loading}
          onEdit={(technician) => {
            setCurrentTechnician(technician);
            setShowForm(true);
          }}
          onStatusChange={(technician) =>
            handleToggleStatus(technician._id, !technician.active)
          }
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};

export default TechniciansPage;
