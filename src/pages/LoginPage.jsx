// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";   // ⭐ add this
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();                 // ⭐ add this
const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // ADMIN LOGIN
    if (username === "admin" && password === "Markwave@2025") {
      dispatch(login({ username: "admin", role: "admin" }));
      navigate("/referral");   // ⭐ redirect
      return;
    }

    // SUPERADMIN LOGIN
    if (username === "superadmin" && password === "superadmin@2025") {
      dispatch(login({ username: "superadmin", role: "superadmin" }));
      navigate("/referral");   // ⭐ redirect
      return;
    }

    alert("Invalid username or password");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage:
          "url('/src/assets/bgimage.jpg')",
      }}
    >
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-xs transform translate-x-6">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    className="w-full border p-2 rounded pr-10"
    placeholder="Enter password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  {/* Toggle Icon */}
  <span
  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</span>

</div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
