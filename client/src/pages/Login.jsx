import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import { FiLogIn } from "react-icons/fi";
import AuthLayout from "./AuthLayout";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Log in to continue your productivity journey"
    >
      {error && <p className="text-red-400 text-sm mb-3 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <FiLogIn /> Login
        </button>
      </form>
      <p className="text-sm text-gray-400 text-center mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:text-blue-300 underline">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
