// src/App.jsx
import React from "react";
import { Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Referral from "./pages/Referral";
import VerifiedUsers from "./pages/VerifiedUsers";
import BuffaloTree from "./pages/BuffaloTree";
import Products from "./pages/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";
import ThemeToggle from "./components/ThemeToggle";
import { FiLogOut } from "react-icons/fi";

function TopNav({ onLogoutClick }) {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const role = auth.user?.role;

  return (
    <div className="shadow transition py-2 px-4 border-b" id="topnav-theme">
      {/* Title */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold dashboard-title">My Dashboard</h1>


      </div>

      {/* Navigation */}
      {auth.isAuthenticated && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">

            {/* ⭐ Referral */}
            <Link
              to="/referral"
              className="px-3 py-1 border rounded transition duration-300 
                         hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/40 hover:bg-blue-100"
            >
              Referral
            </Link>

            {/* ⭐ Verified Users */}
            {(role === "admin" || role === "superadmin") && (
              <Link
                to="/verified"
                className="px-3 py-1 border rounded transition duration-300 
                           hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/40 hover:bg-blue-100"
              >
                Verified Users
              </Link>
            )}

            {/* ⭐ Buffalo Tree + Products */}
            {role === "superadmin" && (
              <>
                <Link
                  to="/buffalo"
                  className="px-3 py-1 border rounded transition duration-300 
                             hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/40 hover:bg-blue-100"
                >
                  Buffalo Tree
                </Link>

                <Link
                  to="/products"
                  className="px-3 py-1 border rounded transition duration-300 
                             hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/40 hover:bg-blue-100"
                >
                  Products
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span>{auth.user.username}</span>

            {/* Logout Button → opens modal */}
            <button
              onClick={onLogoutClick}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              <FiLogOut className="text-xl" />Logout
              
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const hideNav = location.pathname === "/login";

  const [showLogoutBox, setShowLogoutBox] = React.useState(false);

  const handleLogoutConfirm = () => {
    dispatch(logout());
    setShowLogoutBox(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutBox(false);
  };

  return (
    <div id="app-theme" className="min-h-screen light-mode transition">

      {!hideNav && <TopNav onLogoutClick={() => setShowLogoutBox(true)} />}

      {/* Logout Confirmation Box */}
      {showLogoutBox && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-80 text-center">

            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Are you sure you want to logout?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Yes
              </button>

              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ROUTES */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/referral"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <Referral />
            </ProtectedRoute>
          }
        />

        <Route
          path="/verified"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <VerifiedUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buffalo"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <BuffaloTree />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
