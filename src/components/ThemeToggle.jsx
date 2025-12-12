// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [showSpinner, setShowSpinner] = useState(false); // ⭐ show spin icon

  useEffect(() => {
    const app = document.getElementById("app-theme");

    if (theme === "dark") {
      app.classList.add("dark", "dark-mode");
app.classList.remove("light-mode");

    } else {
      app.classList.add("light-mode");
app.classList.remove("dark", "dark-mode");

    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setShowSpinner(true);

    // hide spinner after animation
    setTimeout(() => setShowSpinner(false), 800);

    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      {/* ⭐ CENTER SPINNING ICON */}
      {showSpinner && (
        <div className="fixed inset-0 flex items-center justify-center z-[999] pointer-events-none">
          <i
            className="fas fa-circle-notch text-[40px] "
            style={{
              animation: "spinSmooth 0.8s linear",
              filter: "drop-shadow(0 0 18px rgba(59,130,246,0.9))",
            }}
          ></i>

          {/* Inline CSS for animation */}
          <style>
            {`
              @keyframes spinSmooth {
                0% { transform: rotate(0deg); opacity: 1; }
                100% { transform: rotate(360deg); opacity: 0; }
              }
            `}
          </style>
        </div>
      )}

      {/* ⭐ ORIGINAL BUTTON (unchanged UI) */}
      <button
        onClick={handleToggle}
        className="px-3 py-1 border rounded text-sm"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </>
  );
}
