import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  CirclePlus,
  Settings,
  LogOut,
  Headset,
} from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth.js";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      end: true,
    },
    {
      name: "Tickets",
      icon: Ticket,
      path: "/tickets",
      end: true, // Important
    },
    {
      name: "New Ticket",
      icon: CirclePlus,
      path: "/tickets/new",
      end: true,
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      end: true,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-60 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <Headset size={20} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-800">
            SupportSphere
          </h1>

          <p className="text-xs text-slate-500">
            Customer CRM
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 pt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogout}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-red-500 text-sm font-medium text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </motion.button>
      </div>
    </aside>
  );
};

export default Sidebar;