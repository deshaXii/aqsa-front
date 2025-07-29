import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "../components/auth/PrivateRoute";
import LoadingSpinner from "../components/ui/LoadingSpinner";

// استيراد الصفحات باستخدام Lazy Loading
const LoginPage = lazy(() => import("../pages/LoginPage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const CustomersPage = lazy(() => import("../pages/CustomersPage"));
const RepairsPage = lazy(() => import("../pages/RepairsPage"));
const RepairDetailPage = lazy(() => import("../pages/RepairDetailPage"));
const TechniciansPage = lazy(() => import("../pages/TechniciansPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const BackupPage = lazy(() => import("../pages/BackupPage"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <CustomersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/repairs"
          element={
            <PrivateRoute>
              <RepairsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/repairs/:id"
          element={
            <PrivateRoute>
              <RepairDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/technicians"
          element={
            <PrivateRoute>
              <TechniciansPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/backup"
          element={
            <PrivateRoute>
              <BackupPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
