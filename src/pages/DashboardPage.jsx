import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import {
  AttachMoney,
  People,
  Build,
  DoneAll,
  PendingActions,
} from "@mui/icons-material";
import StatsCard from "../components/dashboard/StatsCard";
import RecentRepairs from "../components/dashboard/RecentRepairs";
import { getDashboardStats, getRecentRepairs } from "../services/api";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentRepairs, setRecentRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, repairsData] = await Promise.all([
          getDashboardStats(),
          getRecentRepairs(),
        ]);
        setStats(statsData);
        setRecentRepairs(repairsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !stats) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        لوحة التحكم
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={<AttachMoney fontSize="large" />}
            title="إجمالي الأرباح"
            value={stats.totalProfit}
            unit="ج.م"
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={<PendingActions fontSize="large" />}
            title="الصيانات المنتظرة"
            value={stats.pendingRepairs}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={<Build fontSize="large" />}
            title="الصيانات الجارية"
            value={stats.inProgressRepairs}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            icon={<DoneAll fontSize="large" />}
            title="الصيانات المكتملة"
            value={stats.completedRepairs}
            color="primary"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <RecentRepairs repairs={recentRepairs} />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            icon={<People fontSize="large" />}
            title="العملاء الجدد"
            value={stats.newCustomers}
            color="secondary"
            sx={{ height: "100%" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
