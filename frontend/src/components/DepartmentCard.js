import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, Server, Cpu, Zap, Settings, PenTool, Bot } from "lucide-react";

const icons = {
  CSE: Code,
  IT: Server,
  ECE: Cpu,
  EEE: Zap,
  MECH: Settings,
  CIVIL: PenTool,
  "AI & DS": Bot
};

export default function DepartmentCard({ dept }) {

  // Prevent crash if dept is undefined
  if (!dept) return null;

  const Icon = icons[dept.name] || Code;

  return (

    <Link
      to={`/department/${encodeURIComponent(dept.name)}`}
      className="block group"
    >

      <motion.div
        whileHover={{ y: -12, scale: 1.03 }}
        transition={{ duration: 0.25 }}
        className="relative h-64 rounded-2xl 
        bg-white/10 backdrop-blur-lg 
        border border-white/20 
        p-6 flex flex-col justify-between 
        shadow-xl 
        hover:border-cyan-400 
        hover:shadow-cyan-500/20"
      >

        {/* Icon */}

        <div className="p-4 w-fit rounded-xl 
        bg-white/10 
        group-hover:bg-cyan-400/20 
        transition">

          <Icon
            size={34}
            className="text-white group-hover:text-cyan-400 transition"
          />

        </div>

        {/* Text */}

        <div>

          <h3 className="text-xl font-bold text-white mb-1">
            {dept.name}
          </h3>

          <p className="text-gray-300 text-sm">
            Engineering resources and notes
          </p>

          {/* Optional note count */}

          {dept.count !== undefined && (
            <p className="text-cyan-400 text-sm mt-2 font-semibold">
              📚 {dept.count} Notes
            </p>
          )}

        </div>

        {/* Hover button */}

        <div className="text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition">

          Enter Department →

        </div>

      </motion.div>

    </Link>

  );
}