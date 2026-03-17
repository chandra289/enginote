import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: ""
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "https://enginote-production.up.railway.app/api/auth/register",
        form
      );

      alert(res.data.message); // Signup successful
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"></div>

      {/* Glow */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-40 top-10 left-20"></div>
      <div className="absolute w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-40 bottom-10 right-20"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-xl w-96">

        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          ENGINOTE
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Department */}
        <input
          type="text"
          placeholder="Department"
          className="w-full mb-6 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 p-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-300">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}