import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const MobileSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      end: true,
    },
    {
      name: "Tickets",
      path: "/tickets",
      icon: <Ticket size={18} />,
      end: true, // <-- Important
    },
    {
      name: "New Ticket",
      path: "/tickets/new",
      icon: <PlusCircle size={18} />,
      end: true,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={18} />,
      end: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="fixed left-0 top-0 z-50 flex h-screen w-[85%] max-w-[260px] flex-col bg-white shadow-xl lg:hidden"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
              <Link
                to="/dashboard"
                onClick={onClose}
                className="text-lg font-bold text-indigo-600"
              >
                SupportSphere
              </Link>

              <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* User */}
            <div className="border-b border-slate-200 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-800">
                    {user?.name}
                  </h3>

                  <p className="truncate text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3">
              <div className="space-y-1">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-indigo-600 text-white shadow"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-200 p-3">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-red-500 text-sm font-medium text-white hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;