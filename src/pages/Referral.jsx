// src/pages/Referral.jsx
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteReferral,
  startEditing,
} from "../store/slices/referralsSlice";
import AddReferralModal from "../components/AddReferralModal";

import { FaEdit, FaTrash } from "react-icons/fa"; 

const Referral = () => {
  const referrals = useSelector((s) => s.referrals.items);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [search, setSearch] = useState("");

  // FILTER + SORT alphabetically
  const filteredReferrals = useMemo(() => {
    return referrals
      .filter((r) =>
        `${r.firstName} ${r.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) => a.firstName.localeCompare(b.firstName));
  }, [referrals, search]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Referrals</h1>

      {/* SEARCH BAR */}
      <div className="mb-4 flex justify-center px-3 py-1  hover:-translate-y-2 hover:shadow-m hover:shadow-blue-500/40 ">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded w-1/2 shadow bg-white text-black placeholder-gray-500  dark:text-white dark:placeholder-gray-400 superadmin px-3 py-1 border rounded transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/40 hover:bg-blue-100"

          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-300">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left w-[12%]">DOB</th>
              <th className="p-3 text-left w-[12%]">Mobile</th>
              <th className="p-3 text-left w-[14%]">First Name</th>
              <th className="p-3 text-left w-[14%]">Last Name</th>
              <th className="p-3 text-left w-[14%]">Aadhaar</th>
              <th className="p-3 text-left w-[14%]">Ref Mob</th>
              <th className="p-3 text-left w-[14%]">Ref Name</th>
              <th className="p-3 text-center w-[10%]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReferrals.map((r) => (
              <tr key={r.id} className="border-t border-gray-300">
                <td className="p-3">{r.dob}</td>
                <td className="p-3">{r.mobile}</td>
                <td className="p-3">{r.firstName}</td>
                <td className="p-3">{r.lastName}</td>
                <td className="p-3">{r.aadhaar}</td>
                <td className="p-3">{r.refMobile}</td>
                <td className="p-3">{r.refName}</td>

                <td className="p-3 flex justify-center gap-4 text-xl">

                  {/* EDIT BUTTON */}
                  <FaEdit
                    className="text-blue-400 cursor-pointer"
                    onClick={() => {
                      dispatch(startEditing(r));  // ⭐ set referral for editing
                      setShowModal(true);         // ⭐ open modal
                    }}
                  />

                  {/* DELETE BUTTON */}
                  <FaTrash
                    className="text-scale-400 cursor-pointer"
                    onClick={() => dispatch(deleteReferral(r.id))}
                  />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT BUTTON */}
      <button
        onClick={() => {
          dispatch(startEditing(null));  // ⭐ add new referral
          setShowModal(true);
        }}
        className="fixed bottom-6 left-6 bg-blue-600 text-white w-14 h-14 rounded-full text-3xl flex items-center justify-center shadow-lg"
      >
        +
      </button>

      {/* MODAL */}
      {showModal && <AddReferralModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Referral;
