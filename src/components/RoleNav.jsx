import React from "react";
import { NavLink } from "react-router-dom";

const RoleNav = () => {
  const role = localStorage.getItem("role");

  const links = [
    { key: "referral", label: "Referral", to: "/referral", allowed: ["admin","superadmin"] },
    { key: "verified", label: "Verified Users", to: "/verified", allowed: ["admin","superadmin"] },
    { key: "buffalo", label: "Buffalo Tree", to: "/buffalo", allowed: ["superadmin"] },
    { key: "products", label: "Products", to: "/products", allowed: ["superadmin"] },
  ];

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold">Markwave Dashboard</div>

        <div className="flex items-center space-x-3">
          {links.map((l) =>
            l.allowed.includes(role) ? (
              <NavLink
                key={l.key}
                to={l.to}
                className={({isActive}) => 
                  `px-4 py-2 rounded-md ${isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`
                }
              >
                {l.label}
              </NavLink>
            ) : null
          )}
          <button onClick={logout} className="ml-6 px-3 py-2 bg-red-500 text-white rounded">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default RoleNav;
