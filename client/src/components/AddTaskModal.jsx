import { useState } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";

export default function AddTaskModal({ close, refresh }) {
  const [form, setForm] = useState({ taskName: "", category: "", priority: "Medium" });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    refresh(); close();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={close} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md rounded-2xl p-[1px] bg-gradient-to-br from-blue-500 to-indigo-600 shadow-neon"
        >
          <div className="rounded-2xl bg-[#0c152d] p-6">
            <h3 className="text-xl font-semibold text-white mb-5">Add New Task</h3>
            <form onSubmit={submit} className="space-y-4">
              <input
                className="w-full bg-white/5 border border-blue-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Task name" required
                onChange={(e)=>setForm(v=>({...v,taskName:e.target.value}))}
              />
              <input
                className="w-full bg-white/5 border border-blue-500/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Category"
                onChange={(e)=>setForm(v=>({...v,category:e.target.value}))}
              />
              <select
                className="w-full bg-white/5 border border-blue-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                onChange={(e)=>setForm(v=>({...v,priority:e.target.value}))}
                defaultValue="Medium"
              >
                <option>Low</option><option>Medium</option><option>High</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={close} className="text-gray-300 hover:text-white">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-neon hover:opacity-90"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
