import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import { FiTrash2, FiPlay, FiStopCircle, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ taskName: "", category: "", priority: "Medium" });
  const [activeSession, setActiveSession] = useState(null);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    await API.post("/tasks", form);
    setForm({ taskName: "", category: "", priority: "Medium" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    if (confirm("Delete this task?")) {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    }
  };

  const startTimer = async (taskId) => {
    const { data } = await API.post("/sessions/start", { taskId });
    setActiveSession({ ...data, taskId });
  };

  const stopTimer = async () => {
    if (!activeSession) return;
    await API.post("/sessions/stop", { sessionId: activeSession._id });
    setActiveSession(null);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-[#0b1226] text-white relative">
      {/* Neon glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 -left-16 h-80 w-80 bg-blue-600 blur-[110px] rounded-full" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 bg-indigo-600 blur-[110px] rounded-full" />
      </div>

      <Navbar />

      <div className="relative z-10 p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold tracking-tight">🧾 Task Manager</h2>
        </div>

        {/* Add Task Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={addTask}
          className="bg-white/5 border border-blue-500/20 p-5 rounded-2xl shadow-neon backdrop-blur-sm flex flex-wrap items-center gap-3"
        >
          <input
            type="text"
            name="taskName"
            placeholder="Task name"
            value={form.taskName}
            onChange={(e) => setForm({ ...form, taskName: e.target.value })}
            className="bg-[#0f172a] border border-blue-500/30 text-white p-2 rounded-lg flex-1 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="bg-[#0f172a] border border-blue-500/30 text-white p-2 rounded-lg flex-1 focus:outline-none focus:border-blue-500"
          />
          <select
            name="priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="bg-[#0f172a] border border-blue-500/30 text-white p-2 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-neon hover:opacity-90 flex items-center gap-2"
          >
            <FiPlus /> Add Task
          </button>
        </motion.form>

        {/* Tasks List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 bg-white/5 border border-blue-500/20 p-6 rounded-2xl shadow-neon backdrop-blur-sm"
        >
          {tasks.length === 0 ? (
            <p className="text-gray-400 text-center py-6">No tasks yet — create one above to begin.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-blue-500/20 text-blue-400">
                  <th className="p-3 font-medium">Task</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Priority</th>
                  <th className="p-3 font-medium">Worked (min)</th>
                  <th className="p-3 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b border-blue-500/10 hover:bg-blue-500/10 transition"
                  >
                    <td className="p-3">{task.taskName}</td>
                    <td className="p-3 text-gray-300">{task.category}</td>
                    <td
                      className={`p-3 ${
                        task.priority === "High"
                          ? "text-red-400"
                          : task.priority === "Medium"
                          ? "text-yellow-300"
                          : "text-green-400"
                      }`}
                    >
                      {task.priority}
                    </td>
                    <td className="p-3">{task.totalMinutesWorked}</td>
                    <td className="p-3 flex gap-3 justify-center">
                      {activeSession && activeSession.taskId === task._id ? (
                        <button
                          onClick={stopTimer}
                          className="px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-neon hover:opacity-90 flex items-center gap-1"
                        >
                          <FiStopCircle /> Stop
                        </button>
                      ) : (
                        <button
                          onClick={() => startTimer(task._id)}
                          className="px-3 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-neon hover:opacity-90 flex items-center gap-1"
                        >
                          <FiPlay /> Start
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="px-3 py-2 rounded-lg bg-white/10 hover:bg-red-500/30 border border-red-500/30 text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </div>
  );
}
