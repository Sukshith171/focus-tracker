import { motion } from "framer-motion";
import { FiTarget } from "react-icons/fi";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Neon Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#111a33] to-[#0a0f1e]" />
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-blue-600/40 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-600/30 blur-[100px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[90%] max-w-md glass-card p-8"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-16 w-16 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-500/40 mb-3">
            <FiTarget className="text-3xl text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-1">{title}</h1>
          <p className="text-gray-400 text-sm text-center">{subtitle}</p>
        </div>

        {children}
      </motion.div>
    </div>
  );
}
