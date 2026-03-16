import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import Semester from "./pages/Semester";
import Subjects from "./pages/Subjects";
import Units from "./pages/Units";

import Profile from "./pages/Profile";
import MyUploads from "./pages/MyUploads";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <BrowserRouter>

      <Routes>

        {/* AUTH ROUTES */}

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* DEPARTMENT FLOW */}

        <Route
          path="/department/:name"
          element={
            <ProtectedRoute>
              <Department />
            </ProtectedRoute>
          }
        />

        <Route
          path="/department/:name/semester/:sem"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/department/:name/semester/:sem/subject/:subject"
          element={
            <ProtectedRoute>
              <Units />
            </ProtectedRoute>
          }
        />

        <Route
          path="/department/:name/semester/:sem/subject/:subject/unit/:unit"
          element={
            <ProtectedRoute>
              <Semester />
            </ProtectedRoute>
          }
        />


        {/* USER PAGES */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-uploads"
          element={
            <ProtectedRoute>
              <MyUploads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />


        {/* SUPER ADMIN ROUTE */}

        <Route
  path="/admin"
  element={
    user?.role === "superadmin"
      ? <AdminDashboard />
      : <Navigate to="/dashboard" />
  }
/>


      </Routes>

    </BrowserRouter>

  );
}

export default App;