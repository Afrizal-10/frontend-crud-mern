import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {alertError, alertRegisterSuccess} from "../utils/SweetAlert";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registrasi gagal.");

      alertRegisterSuccess("Registrasi berhasil! Silakan login.");
      navigate("/");
    } catch (err) {
      alertError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="relative w-80 overflow-hidden rounded-lg shadow-[0_0_10px_rgba(0,255,255,0.2)] bg-[#111] p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative w-full">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer appearance-none placeholder-transparent autofill:bg-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              Username
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({...formData, email: e.target.value})
              }
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer appearance-none placeholder-transparent autofill:bg-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              Email
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({...formData, password: e.target.value})
              }
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer appearance-none placeholder-transparent autofill:bg-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              Password
            </label>
          </div>

          <div className="relative w-full">
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({...formData, confirmPassword: e.target.value})
              }
              required
              className="w-full bg-transparent border-b border-gray-600 focus:border-cyan-400 text-sm py-2 outline-none peer appearance-none placeholder-transparent autofill:bg-transparent"
            />
            <label className="absolute left-0 top-2 text-gray-400 text-sm transition-all peer-focus:-translate-y-5 peer-focus:text-cyan-400 peer-valid:-translate-y-5">
              Confirm Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold py-2 rounded transition"
          >
            Sign Up
          </button>

          <p className="text-xs text-gray-400 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-cyan-400 font-semibold cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
