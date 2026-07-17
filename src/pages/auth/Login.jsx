import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import api from "../../services/api.js";
import useAuth from "../../hooks/useAuth.js";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", formData);

      console.log("Login Response:", data);

      login(data.user, data.token);

      console.log("After Login");

      toast.success(data.message);

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl rounded-3xl overflow-hidden bg-white shadow-2xl grid lg:grid-cols-2"
      >
        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center bg-indigo-600 p-12 text-white">
          <ShieldCheck size={60} />

          <h1 className="mt-8 text-4xl font-bold">SupportSphere CRM</h1>

          <p className="mt-5 text-lg leading-8 text-indigo-100">
            Customer Support Management made simple.
          </p>
        </div>

        {/* Right */}

        <div className="p-8 sm:p-10 lg:p-14 flex items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold">Welcome Back 👋</h2>

            <p className="mt-2 text-slate-500">Login to continue</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[50px]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <Button type="submit" loading={loading}>
                Login
              </Button>
            </form>

            <p className="mt-6 text-center text-slate-600">
              Don't have an account?
              <Link
                to="/register"
                className="ml-2 font-semibold text-indigo-600"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
