// src/components/AddReferralModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReferral,
  saveEditedReferral,
} from "../store/slices/referralsSlice";

const AddReferralModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const editingReferral = useSelector((s) => s.referrals.editingReferral);

  const [form, setForm] = useState({
    dob: "",
    mobile: "",
    firstName: "",
    lastName: "",
    aadhaar: "",
    refMobile: "",
    refName: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingReferral) {
      setForm(editingReferral);
    }
  }, [editingReferral]);

  const handleChange = (field, value) => {
    if (
      (field === "mobile" ||
        field === "refMobile" ||
        field === "aadhaar") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }
    setForm({ ...form, [field]: value });
  };

  const validate = () => {
    if (
      !form.dob ||
      !form.mobile ||
      !form.firstName ||
      !form.lastName ||
      !form.aadhaar ||
      !form.refMobile ||
      !form.refName
    ) {
      return "Please fill all fields.";
    }

    if (form.mobile.length !== 10)
      return "Mobile number must be exactly 10 digits.";

    if (form.refMobile.length !== 10)
      return "Referrer mobile number must be exactly 10 digits.";

    if (form.aadhaar.length !== 12)
      return "Aadhaar number must be exactly 12 digits.";

    const birthYear = new Date(form.dob).getFullYear();
    const currentYear = new Date().getFullYear();
    if (currentYear - birthYear < 21)
      return "Age must be at least 21 years.";

    return "";
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    if (editingReferral) {
      dispatch(saveEditedReferral(form));
    } else {
      dispatch(addReferral(form));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      {/* ⭐ ONLY CHANGE → Added safe light box class */}
      <div className="modal-content bg-white p-8 rounded-xl w-96 shadow-xl">


        <h2 className="text-xl font-bold mb-4">
          {editingReferral ? "Edit Referral" : "Add New Referral"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <label className="text-sm font-semibold">Date of Birth</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={form.dob}
          onChange={(e) => handleChange("dob", e.target.value)}
        />

        <label className="text-sm font-semibold">Mobile</label>
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="10-digit number"
          maxLength={10}
          value={form.mobile}
          disabled={!!editingReferral}
          onChange={(e) => handleChange("mobile", e.target.value)}
        />

        <label className="text-sm font-semibold">First Name</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />

        <label className="text-sm font-semibold">Last Name</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />

        <label className="text-sm font-semibold">Aadhaar Number</label>
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="12-digit number"
          maxLength={12}
          value={form.aadhaar}
          onChange={(e) => handleChange("aadhaar", e.target.value)}
        />

        <label className="text-sm font-semibold">Referred By (Mobile)</label>
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="10-digit number"
          maxLength={10}
          value={form.refMobile}
          disabled={!!editingReferral}
          onChange={(e) => handleChange("refMobile", e.target.value)}
        />

        <label className="text-sm font-semibold">Referred By (Name)</label>
        <input
          className="w-full p-2 border rounded mb-3"
          value={form.refName}
          onChange={(e) => handleChange("refName", e.target.value)}
        />

        <div className="flex justify-between mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingReferral ? "Save" : "Submit"}
          </button>

          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddReferralModal;
