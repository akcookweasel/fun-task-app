"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

type Task = {
  id: number;
  text: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const addTask = () => {
    if (!input) return;
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput("");
  };

  const completeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
  };

  return (
    <main style={styles.container}>
      {showConfetti && <Confetti numberOfPieces={200} />}

      <h1 style={styles.title}>✨ Fun Task Tracker ✨</h1>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button style={styles.button} onClick={addTask}>
          Add
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={styles.task}
              onClick={() => completeTask(task.id)}
            >
              {task.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center",
    background: "linear-gradient(to bottom right, #fce7f3, #e0f2fe)",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "2.5rem",
  },
  inputRow: {
    marginTop: 20,
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "200px",
  },
  button: {
    padding: "10px 15px",
    marginLeft: 10,
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#a78bfa",
    color: "white",
    cursor: "pointer",
  },
  task: {
    background: "white",
    padding: "10px",
    margin: "10px auto",
    borderRadius: "10px",
    width: "250px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};
