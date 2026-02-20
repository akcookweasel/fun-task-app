"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Confetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [textColor, setTextColor] = useState("#000000");

  return (
    ...
  );
}
  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, task]);
    setTask("");
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white p-8">
      {showConfetti && <Confetti />}

      <h1 className="text-4xl font-bold mb-6">✨ Fun Task Tracker ✨</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-4 py-2 rounded text-black"
          placeholder="Enter a task"
        />
        <button
          onClick={addTask}
          className="bg-yellow-400 px-4 py-2 rounded font-bold"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {tasks.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white text-black px-4 py-2 rounded shadow"
            >
              ⭐ {t}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}