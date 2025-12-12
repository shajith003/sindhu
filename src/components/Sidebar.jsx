import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/", { replace: true });
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg p-6 hidden md:block z-40">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>

      <nav className="space-y-3">
        <NavLink to="/referral" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-100'}`}>Referral</NavLink>

        <NavLink to="/verified" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-100'}`}>Verified Users</NavLink>

        {role === "superadmin" && (
          <>
            <NavLink to="/buffalo-tree" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-100'}`}>Buffalo Tree</NavLink>
            <NavLink to="/products" className={({isActive}) => `block p-2 rounded ${isActive ? 'bg-blue-50 text-blue-500' : 'text-gray-700 hover:bg-gray-100'}`}>Products</NavLink>
          </>
        )}
      </nav>

      <div className="absolute bottom-6 left-6">
        <button onClick={logout} className="px-3 py-2 rounded bg-red-500 text-white">Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
