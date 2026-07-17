import { Bell, Menu } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-5 lg:px-6">
        {/* Left */}

        <div className="flex items-center gap-3">
          {/* Mobile Menu */}

          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          {/* Notification */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100"
          >
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </motion.button>

          {/* User */}

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <div className="hidden md:block leading-tight">
              <h3 className="text-sm font-semibold text-slate-800">
                {user?.name}
              </h3>

              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
