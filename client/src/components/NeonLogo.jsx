import { motion } from "framer-motion";
import { FiTarget } from "react-icons/fi";

export default function NeonLogo({ size = 80 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* glowing halo */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 blur-xl opacity-70"
      />

      {/* rotating orb ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-blue-500/50"
      />

      {/* main icon */}
      <div className="relative z-10 flex items-center justify-center bg-[#0f172a] rounded-full h-full w-full border border-blue-500/60 shadow-neon">
        <FiTarget className="text-blue-400 text-4xl drop-shadow-neon" />
      </div>
    </motion.div>
  );
}
