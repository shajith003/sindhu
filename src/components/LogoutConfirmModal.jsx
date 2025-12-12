// src/components/LogoutModal.jsx
import React from "react";

export default function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div
      className="
        fixed inset-0 
        bg-black/50 
        backdrop-blur-sm
        flex justify-center items-center 
        z-50 
        animate-fadeIn
      "
    >
      <div
        className="
          bg-[#152235] dark:bg-[#0f172a]
          text-white
          p-8 
          rounded-2xl 
          w-[90%] max-w-md 
          shadow-2xl shadow-black/40
          transform 
          animate-scaleIn
        "
      >
        <h2 className="text-2xl font-bold text-center mb-6 leading-relaxed">
          Are you sure you want to <br /> logout?
        </h2>

        <div className="flex justify-center gap-4">
          {/* YES BUTTON */}
          <button
            onClick={onConfirm}
            className="
              bg-red-400 
              hover:bg-red-600
              text-white 
              px-6 py-2 
              rounded-lg 
              shadow-md shadow-red-500/30 
              hover:shadow-red-500/60
              transition-all duration-200
              hover:-translate-y-1
            "
          >
            Yes
          </button>

          {/* CANCEL BUTTON */}
          <button
            onClick={onCancel}
            className="
              bg-gray-400 
              hover:bg-gray-500 
              text-white 
              px-6 py-2 
              rounded-lg
              shadow-md shadow-gray-300/30
              hover:shadow-gray-300/60
              transition-all duration-200
              hover:-translate-y-1
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
