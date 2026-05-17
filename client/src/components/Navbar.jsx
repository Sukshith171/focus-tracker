import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiTarget, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`px-3 py-1 rounded-md transition
        ${pathname === to ? "text-white bg-blue-600/30" : "text-gray-300 hover:text-white hover:bg-white/10"}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#0b1226]/60 border-b border-blue-500/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-neon">
            <FiTarget className="text-white text-xl drop-shadow-neon" />
          </div>
          <span className="text-white font-semibold tracking-tight">FocusTrack</span>
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/tasks" label="Tasks" />
            <NavLink to="/focus" label="Focus" />
            <span className="ml-2 mr-3 hidden sm:inline text-gray-300">Hi, {user.name}</span>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 shadow-neon"
              title="Logout"
            >
              <FiLogOut />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
