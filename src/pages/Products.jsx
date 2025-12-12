import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  startEditingProduct,
  setSearchTerm,
} from "../store/slices/productsSlice";

import EditProductModal from "../components/EditProductModal";
import AddProductModal from "../components/AddProductModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// --------------------------------------------------
// PRODUCT CARD
// --------------------------------------------------
const ProductCard = ({ product }) => {
  const [idx, setIdx] = useState(0);
  const dispatch = useDispatch();
  const images = product.images || [];

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/products/${product.id}`);
    dispatch(deleteProduct(product.id));
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const int = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 3000);

    return () => clearInterval(int);
  }, [images.length]);

  return (
    <div className="product-card bg-white border rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-3 dark:placeholder-gray-400 superadmin px-3 py-1 border rounded transition duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:bg-blue-100">

      <div className="relative h-64 rounded-xl overflow-hidden">
        <img
          src={images[idx]}
          className={`w-full h-full object-cover transition-all duration-500 ${
            product.inStock ? "" : "opacity-50 grayscale"
          }`}
          alt={product.breed}
        />

        {/* Slider dots */}
        <div className="absolute bottom-3 w-full flex justify-center gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-[3px] rounded-full ${
                i === idx ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        <div
          className={`absolute top-3 right-3 text-xs px-2 py-1 rounded ${
            product.inStock ? "bg-[#1A3D64]" : "bg-[1A3D64]"
          } text-white`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-lg font-bold">{product.breed}</h3>

        <p className="text-sm text-gray-500">
          <b>Age:</b> {product.age} <br />
          <b>Location:</b> {product.location || "N/A"} <br />
          <b>ID:</b> {product.id}
        </p>

        <p className="mt-2 text-gray-700">{product.description}</p>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <div className="text-xl font-bold text-green-500">
              ₹{product.price.toLocaleString()}
            </div>
            <div className="text-xs text-slate-600">
              Insurance: ₹{product.insurance.toLocaleString()}
            </div>
          </div>

          <div className="flex gap-4 text-xl">
            <FaEdit
              className="text-blue-400 cursor-pointer hover:scale-110 transition"
              onClick={() => dispatch(startEditingProduct(product))}
            />

            <FaTrash
              className="text-red-500 cursor-pointer hover:scale-110 transition"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --------------------------------------------------
// PRODUCTS PAGE
// --------------------------------------------------
export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((s) => s.products.items);
  const search = useSelector((s) => s.products.searchTerm);
  const editing = useSelector((s) => s.products.editingProduct);

  const [showAdd, setShowAdd] = useState(false);

  const reloadProducts = async () => {
    const res = await axios.get("http://localhost:3001/products");
    dispatch({
      type: "products/setAllProducts",
      payload: res.data,
    });
  };

  useEffect(() => {
    reloadProducts();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.breed.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>

      {/* SEARCH BAR */}
      <div className="no-dark w-1/2">
        <input
          type="text"
          placeholder="Search buffalo..."
          className="
            w-full border p-2 rounded shadow-sm mb-5
            bg-white text-black placeholder-gray-500
            dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400
          "
          value={search}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <EditProductModal
          onClose={(shouldReload) => {
  dispatch(startEditingProduct(null));
  if (shouldReload) reloadProducts();
}}

        />
      )}

      {/* ADD PRODUCT MODAL */}
      {showAdd && (
        <AddProductModal
          onClose={() => {
            setShowAdd(false);
            reloadProducts();
          }}
        />
      )}

      {/* ⭐ FLOATING ADD BUTTON LIKE REFERRAL PAGE */}
      <div
        onClick={() => setShowAdd(true)}
        className="
          fixed bottom-6 right-6 bg-blue-600 text-white w-12 h-12 
          rounded-full flex items-center justify-center shadow-xl 
          hover:scale-110 transition cursor-pointer text-3xl z-50
        "
      >
        +
      </div>
    </div>
  );
}
