import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthContext';
import DashboardLayout from './layout/DashboardLayout';
import Forgot from './pages/Forgot';

// Dashboards
import SuperAdminDashboard from './pages/superAdmin/SuperAdminDashboard';
import TempleAdminDashboard from './pages/templeAdmin/TempleAdminDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';

// Super Admin pages
import CreateTemple from './pages/superAdmin/CreateTemple';
import AssignTempleAdmin from './pages/superAdmin/AssignTempleAdmin';
import AssignModules from './pages/superAdmin/AssignModules';

// Temple Admin / Staff pages
import BookingPage from './pages/templeAdmin/BookingPage';
import SevaPage from './pages/templeAdmin/SevaPage';
import DonationPage from './pages/templeAdmin/DonationPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ---------- PUBLIC ---------- */}
          <Route path="/login" element={<Login />} />
< Route path="/forgot" element={<Forgot />} />
          {/* ---------- DEFAULT ---------- */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* ---------- SUPER ADMIN ---------- */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute role="SUPER_ADMIN">
                <DashboardLayout>
                  <SuperAdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/temples"
            element={
              <ProtectedRoute role="SUPER_ADMIN">
                <DashboardLayout>
                  <CreateTemple />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/assign-admin"
            element={
              <ProtectedRoute role="SUPER_ADMIN">
                <DashboardLayout>
                  <AssignTempleAdmin />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/assign-modules"
            element={
              <ProtectedRoute role="SUPER_ADMIN">
                <DashboardLayout>
                  <AssignModules />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* ---------- TEMPLE ADMIN ---------- */}
          <Route
            path="/temple-admin"
            element={
              <ProtectedRoute role="TEMPLE_ADMIN">
                <DashboardLayout>
                  <TempleAdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <ProtectedRoute role="TEMPLE_ADMIN">
                <DashboardLayout>
                  <BookingPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/seva"
            element={
              <ProtectedRoute role="TEMPLE_ADMIN">
                <DashboardLayout>
                  <SevaPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/donation"
            element={
              <ProtectedRoute role="TEMPLE_ADMIN">
                <DashboardLayout>
                  <DonationPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* ---------- STAFF ---------- */}
          <Route
            path="/staff"
            element={
              <ProtectedRoute role="STAFF">
                <DashboardLayout>
                  <StaffDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
