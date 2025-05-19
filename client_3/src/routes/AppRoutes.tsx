import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { ReactNode } from "react"
import { RootState } from "../redux/store";
import MainLayout from "../layouts/MainLayout";
import Home from "app/Home/Home";
import Onboarding from "app/Home/Onboarding";
import AuthLayout from "../layouts/AuthLayout";
import Login from "app/Auth/Login";
import Register from "app/Auth/Register";
import ForgotPassword from "app/Auth/ForgotPassword";

// Layouts


// Route Guards
const ProtectedRoute = ({ children, userType }: { children: ReactNode; userType: string }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (userType === "admin" && user?.role !== "admin") {
    return <Navigate to="/citizen/dashboard" />
  }

  if (userType === "citizen" && user?.role !== "citizen") {
    return <Navigate to="/admin/dashboard" />
  }

  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Citizen Routes */}
      {/* <Route
        path="/citizen"
        element={
          <ProtectedRoute userType="citizen">
            <CitizenLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CitizenDashboard />} />
        <Route path="new-complaint" element={<NewComplaint />} />
        <Route path="my-complaints" element={<MyComplaints />} />
        <Route path="complaints/:id" element={<ComplaintDetail />} />
        <Route path="profile" element={<CitizenProfile />} />
      </Route> */}

      {/* Admin Routes */}
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute userType="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="complaints" element={<ComplaintManagement />} />
        <Route path="complaints/:id" element={<ComplaintDetails />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="analytics" element={<Analytics />} />
      </Route> */}

      {/* Catch all - 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
