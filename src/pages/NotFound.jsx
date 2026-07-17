import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg"
      >
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle size={40} className="text-red-500" />
        </div>

        {/* 404 */}
        <h1 className="mt-6 text-6xl font-extrabold text-slate-900">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-bold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-500">
          Sorry, the page you are looking for doesn't exist or has been
          moved.
        </p>

        {/* Button */}
        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Home size={18} />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;