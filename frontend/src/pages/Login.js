import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import graduation from "../assets/graduation.png";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "https://enginote-production.up.railway.app/api/auth/login",
        form
      );

      // save token
      localStorage.setItem("token", res.data.token);

      // save full user object (important for role)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      navigate("/dashboard");

    } catch (err) {

      alert(err.response?.data?.message || "Invalid Email or Password");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"></div>

      {/* Glow Circles */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-40 top-10 left-20"></div>
      <div className="absolute w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-40 bottom-10 right-20"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-xl w-full max-w-sm">

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-5">

          <img
            src={graduation}
            alt="graduation"
            className="w-15 h-20"
          />

          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            ENGINOTE LOGIN
          </h2>

        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>setForm({...form,email:e.target.value})}
          className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e)=>setForm({...form,password:e.target.value})}
          className="w-full mb-6 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 p-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Login
        </button>

        {/* Signup */}
        <p className="text-center text-gray-300 mt-4">

          Don't have an account?{" "}

          <Link to="/signup" className="text-cyan-300">
            Signup
          </Link>

        </p>

      </div>

    </div>
  );
}