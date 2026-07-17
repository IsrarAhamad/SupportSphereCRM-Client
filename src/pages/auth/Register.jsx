import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import api from "../../services/api.js";
import useAuth from "../../hooks/useAuth.js";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (password.length < 6) {
      return toast.error(
        "Password must be at least 6 characters"
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);

      login(data.user, data.token);

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-6 sm:px-6 lg:px-8">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2"
      >

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center bg-indigo-600 p-10 text-white">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <ShieldCheck size={30} />
          </div>

          <h1 className="mt-6 text-3xl font-bold leading-tight">
            SupportSphere CRM
          </h1>

          <p className="mt-4 text-sm leading-7 text-indigo-100">
            Create your account to manage customer
            support tickets with a modern,
            fast and secure CRM.
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />
              <p className="text-sm">
                Manage customer tickets
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />
              <p className="text-sm">
                Track ticket status
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-white" />
              <p className="text-sm">
                Add notes and updates
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">

          <div className="w-full max-w-md">

            <div className="mb-6">

              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Create Account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Register to continue to SupportSphere CRM.
              </p>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <Input
                label="Full Name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                icon={<User size={18} />}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail size={18} />}
                required
              />

              {/* Password */}
              <div className="relative">

                <Input
                  label="Password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  icon={<Lock size={18} />}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-[47px] text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>
                            {/* Confirm Password */}

              <div className="relative">

                <Input
                  label="Confirm Password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  icon={<Lock size={18} />}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-[47px] text-slate-500 transition hover:text-slate-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              <Button
                type="submit"
                loading={loading}
              >
                Create Account
              </Button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?

              <Link
                to="/"
                className="ml-2 font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default Register;