import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { motion } from "framer-motion";

export default function FocusTimer() {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState(null);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };
  useEffect(()=>{ fetchTasks(); },[]);

  useEffect(()=>{
    let t; if (running) t = setInterval(()=>setSeconds(s=>s+1), 1000);
    return ()=>clearInterval(t);
  },[running]);

  const start = async (taskId) => {
    const { data } = await API.post("/sessions/start", { taskId });
    setSession(data); setActiveTask(taskId); setSeconds(0); setRunning(true);
  };
  const stop = async () => {
    if (session) await API.post("/sessions/stop", { sessionId: session._id });
    setRunning(false); setActiveTask(null); setSeconds(0); fetchTasks();
  };

  const mm = String(Math.floor(seconds/60)).padStart(2,"0");
  const ss = String(seconds%60).padStart(2,"0");

  return (
    <div className="min-h-screen bg-[#0b1226] text-white relative">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-24 left-1/3 h-80 w-80 bg-blue-600 blur-[110px] rounded-full" />
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 bg-indigo-600 blur-[110px] rounded-full" />
      </div>

      <Navbar />
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold mb-6 tracking-tight">Focus Mode</h2>

        {activeTask ? (
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: .95, opacity: .9 }} animate={{ scale: 1, opacity: 1 }}
              className="relative h-64 w-64 md:h-80 md:w-80 rounded-full
                bg-gradient-to-br from-blue-600 to-indigo-600 p-[3px] shadow-neon animation-pulse"
            >
              <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/40 animate-pulse-slow" />
              <div className="relative h-full w-full rounded-full bg-[#0c152d] flex flex-col items-center justify-center">
                <div className="text-5xl md:text-6xl font-mono">{mm}:{ss}</div>
                <div className="mt-2 text-sm text-gray-300">
                  {tasks.find(t=>t._id===activeTask)?.taskName}
                </div>
              </div>
            </motion.div>

            <button
              onClick={stop}
              className="mt-8 px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 shadow-neon hover:opacity-90"
            >
              Stop Focus
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-300 mb-4">Choose a task to begin focused work:</p>
            <div className="flex flex-wrap gap-3">
              {tasks.map(t=>(
                <button
                  key={t._id}
                  onClick={()=>start(t._id)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 shadow-neon hover:opacity-90"
                >
                  {t.taskName}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
