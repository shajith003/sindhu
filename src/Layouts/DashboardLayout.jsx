import React from "react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const role = localStorage.getItem("role");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-6">

        {/* Visible to BOTH admin & superadmin */}
        <Link to="/referral" className="block hover:text-blue-400">Referral</Link>
        <Link to="/verified-users" className="block hover:text-blue-400">Verified Users</Link>

        {/* Visible ONLY to superadmin */}
        {role === "superadmin" && (
          <>
            <Link to="/buffalo-tree" className="block hover:text-blue-400">Buffalo Tree</Link>
            <Link to="/products" className="block hover:text-blue-400">Products</Link>
          </>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 bg-gray-100">{children}</div>
    </div>
  );
};

export default DashboardLayout;
