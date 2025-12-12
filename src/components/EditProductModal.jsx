// src/components/EditProductModal.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveEditedProduct,
  updateProductImages,
} from "../store/slices/productsSlice";
import axios from "axios";

const EditProductModal = ({ onClose }) => {
  const editingProduct = useSelector((s) => s.products.editingProduct);
  const dispatch = useDispatch();

  // ⭐ FIX 1 — Make deep copy so editing does NOT mutate Redux accidently
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      setForm(JSON.parse(JSON.stringify(editingProduct)));
    }
  }, [editingProduct]);

  if (!form) return null;

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleImageUpload = async (files) => {
    const fileArray = Array.from(files);

    const base64Images = await Promise.all(
      fileArray.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    );

    const updatedImages = [...(form.images || []), ...base64Images];

    setForm({ ...form, images: updatedImages });

    dispatch(
      updateProductImages({
        id: form.id,
        images: updatedImages,
      })
    );
  };

  // ⭐ FINAL SAVE FIX — now it always works
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3001/products/${form.id}`, form);

      dispatch(saveEditedProduct(form));

      // ⭐ Notify parent to reload products
      onClose(true);

    } catch (error) {
      console.error("Save error:", error);
      alert("Error saving product!");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4"
      style={{ zIndex: 9999 }}
    >
      <div className="modal-content bg-white rounded-xl w-full max-w-md max-h-[90vh] shadow-xl flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Edit Product</h2>
        </div>

        <div className="p-4 overflow-y-auto">
          <label className="text-sm font-semibold">Product ID</label>
          <input
            value={form.id}
            disabled
            className="w-full border p-2 rounded mb-3 bg-gray-200"
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
              <label className="text-sm font-semibold capitalize">
                {field}
              </label>
              <input
                className="w-full border p-2 rounded mb-3"
                value={form[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            </div>
          ))}

          <label className="text-sm font-semibold">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
            className="w-full border p-2 rounded mb-3"
          />

          <div className="flex flex-wrap gap-2">
            {form.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="w-16 h-16 rounded object-cover border"
              />
            ))}
          </div>

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
        </div>

        <div className="p-4 border-t flex justify-between">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>

          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
