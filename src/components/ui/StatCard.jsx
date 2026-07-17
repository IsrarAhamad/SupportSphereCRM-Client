import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        {/* Left */}

        <div className="flex-1">

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-800 sm:text-3xl">
            {value}
          </h2>

          <p className="mt-2 text-xs text-slate-400">
            Updated just now
          </p>

        </div>

        {/* Right */}

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgColor} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon
            size={20}
            className={color}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;