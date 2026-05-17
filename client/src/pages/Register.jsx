import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import API from "../api/axios";
import AuthLayout from "./AuthLayout";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Join FocusTrack and start tracking smarter"
    >
      {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="bg-[#0f172a] border border-blue-500/30 px-3 py-2 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-gray-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="bg-[#0f172a] border border-blue-500/30 px-3 py-2 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-gray-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="bg-[#0f172a] border border-blue-500/30 px-3 py-2 rounded-lg text-white focus:outline-none focus:border-blue-500 placeholder-gray-400"
          required
        />
        <button type="submit" className="neon-btn py-2 rounded-lg flex items-center justify-center gap-2">
          <FiUserPlus /> Register
        </button>
      </form>
      <p className="text-sm text-gray-400 text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:text-blue-300 underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
