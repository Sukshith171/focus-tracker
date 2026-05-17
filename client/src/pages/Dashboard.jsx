import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from "chart.js";
import { FiPlusCircle } from "react-icons/fi";
import AddTaskModal from "../components/AddTaskModal";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [open, setOpen] = useState(false);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
    if (data.length) {
      const high = data.filter(t=>t.priority==="High")
        .sort((a,b)=>a.totalMinutesWorked-b.totalMinutesWorked)[0];
      setSuggestion(high
        ? `⚡ Focus on "${high.taskName}" — High priority & least worked.`
        : "Looks balanced. Keep going! 💪");
    } else setSuggestion("");
  };

  useEffect(()=>{ fetchTasks(); },[]);

  const chartData = {
    labels: tasks.map(t=>t.taskName),
    datasets: [{
      label: "Minutes",
      data: tasks.map(t=>t.totalMinutesWorked),
      backgroundColor: ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4"],
      borderWidth: 0,
    }]
  };

  return (
    <div className="min-h-screen bg-[#0b1226] text-white relative">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 -left-16 h-80 w-80 bg-blue-600 blur-[110px] rounded-full" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 bg-indigo-600 blur-[110px] rounded-full" />
      </div>

      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Your Productivity</h1>
          <p className="text-gray-300 mt-1">Track focused minutes across tasks — visualized with neon clarity.</p>
        </header>

        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-blue-500/20 bg-white/5 p-8 text-center">
            <p className="text-gray-300 mb-4">No tasks yet. Create your first task to begin.</p>
            <button
              onClick={()=>setOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-neon hover:opacity-90"
            >
              <FiPlusCircle /> Add Task
            </button>
          </div>
        ) : (
          <>
            <motion.section
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="rounded-2xl p-5 bg-white/5 border border-blue-500/20 shadow-neon">
                <h3 className="text-blue-300 font-medium mb-2">Time per Task</h3>
                <Pie
                  data={chartData}
                  options={{
                    animation: { duration: 1000 },
                    plugins: { legend: { position: "bottom", labels: { color: "#e5e7eb" } } }
                  }}
                />
              </div>
              <div className="rounded-2xl p-5 bg-white/5 border border-indigo-500/20">
                <h3 className="text-indigo-300 font-medium mb-2">Smart Suggestion</h3>
                <p className="text-gray-200">{suggestion}</p>
                <div className="mt-4">
                  <button
                    onClick={()=>setOpen(true)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-neon hover:opacity-90"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </motion.section>

            {/* floating CTA */}
            <button
              onClick={()=>setOpen(true)}
              className="fixed bottom-6 right-6 md:bottom-8 md:right-8 rounded-full p-4 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-neon hover:opacity-90"
              title="Add Task"
            >
              <FiPlusCircle className="text-white text-2xl" />
            </button>
          </>
        )}
      </main>

      {open && <AddTaskModal close={()=>setOpen(false)} refresh={fetchTasks} />}
    </div>
  );
}