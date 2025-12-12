// src/pages/VerifiedUsers.jsx
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserField } from "../store/slices/VerifiedUsersSlice";

const VerifiedUsers = () => {
  const dispatch = useDispatch();

  // Get users from Redux store
  const users = useSelector((state) => state.verifiedUsers.users);

  // Search state
  const [search, setSearch] = useState("");

  // ⭐ FILTER + SORT (A to Z)
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) =>
        `${u.firstName} ${u.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [users, search]);

  // Update Redux values
  const handleChange = (id, field, value) => {
    dispatch(updateUserField({ id, field, value }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Verified Users</h1>

      {/* 🔍 SEARCH BAR */}
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 w-1/2 rounded shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">First Name</th>
              <th className="p-3">Last Name</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Form Filled</th>
              <th className="p-3">Referred By</th>
              <th className="p-3">Referrer Mobile</th>
              <th className="p-3">Verified</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-5 text-gray-500">
                  No users found
                </td>
              </tr>
            )}

            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">

                {/* First Name */}
                <td className="p-3">
                  <input
                    type="text"
                    value={user.firstName}
                    onChange={(e) =>
                      handleChange(user.id, "firstName", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                </td>

                {/* Last Name */}
                <td className="p-3">
                  <input
                    type="text"
                    value={user.lastName}
                    onChange={(e) =>
                      handleChange(user.id, "lastName", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                </td>

                {/* Mobile - NOT editable */}
                <td className="p-3 font-semibold">{user.mobile}</td>

                {/* Form Filled - Yes/No */}
                <td className="p-3">
                  <select
                    value={user.formFilled}
                    onChange={(e) =>
                      handleChange(user.id, "formFilled", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>

                {/* Referred By */}
                <td className="p-3">
                  <input
                    type="text"
                    value={user.referredBy}
                    onChange={(e) =>
                      handleChange(user.id, "referredBy", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                </td>

                {/* Referrer Mobile - NOT editable */}
                <td className="p-3 font-semibold">{user.referrerMobile}</td>

                {/* Verified - Yes/No */}
                <td className="p-3">
                  <select
                    value={user.verified}
                    onChange={(e) =>
                      handleChange(user.id, "verified", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerifiedUsers;
