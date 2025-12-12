// src/components/AddProductModal.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewProduct } from "../store/slices/productsSlice";
import axios from "axios"; // ⭐ added

// ⭐ Auto-generate ID function
const generateId = (breed) => {
  if (!breed) return "";
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${breed}-${randomNum}`;
};

const AddProductModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: "",
    breed: "",
    age: "",
    location: "",
    description: "",
    price: "",
    insurance: "",
    weight: "",
    milkYield: "",
    healthStatus: "",
    temperament: "",
    feedType: "",
    inStock: true,
    images: [],
  });

  // ⭐ Modify handleChange to auto-create ID
  const handleChange = (key, value) => {
    if (key === "breed") {
      const newId = generateId(value);
      setForm({ ...form, breed: value, id: newId });
    } else {
      setForm({ ...form, [key]: value });
    }
  };

  const handleSubmit = async () => {

    // ⭐ Save to JSON Server
    await axios.post("http://localhost:3001/products", form);

    // ⭐ Keep your existing Redux functionality
    dispatch(addNewProduct(form));

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
      
      {/* MODAL BOX */}
      <div className="modal-content bg-white rounded-xl w-full max-w-md max-h-[90vh] shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Add New Product</h2>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="p-4 overflow-y-auto">

          {/* ⭐ ID Field (Auto Generated & Disabled) */}
          <label className="text-sm font-semibold">ID</label>
          <input
            className="w-full border p-2 rounded mb-3 bg-gray-200"
            value={form.id}
            disabled
          />

          {[ 
            "breed",
            "age",
            "location",
            "description",
            "price",
            "insurance",
            "weight",
            "milkYield",
            "healthStatus",
            "temperament",
            "feedType",
          ].map((field) => (
            <div key={field}>
              <label className="text-sm font-semibold capitalize">{field}</label>
              <input
                className="w-full border p-2 rounded mb-3"
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            </div>
          ))}

          {/* In Stock */}
          <label className="text-sm font-semibold">In Stock</label>
          <select
            className="w-full border p-2 rounded mb-3"
            value={form.inStock}
            onChange={(e) =>
              handleChange("inStock", e.target.value === "true")
            }
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>

          {/* Images */}
          <label className="text-sm font-semibold">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full border p-2 rounded mb-3"
            onChange={(e) =>
              handleChange(
                "images",
                Array.from(e.target.files).map((file) =>
                  URL.createObjectURL(file)
                )
              )
            }
          />
        </div>

        {/* FOOTER BUTTONS */}
        <div className="p-4 border-t flex justify-between">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProductModal;
