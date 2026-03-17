import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import TopRatedNotes from "../components/TopRatedNotes";

export default function Dashboard() {

  const departments = [
    { name: "CSE", icon: "💻" },
    { name: "IT", icon: "🌐" },
    { name: "ECE", icon: "📡" },
    { name: "EEE", icon: "⚡" },
    { name: "MECH", icon: "⚙️" },
    { name: "CIVIL", icon: "🏗️" },
    { name: "AI & DS", icon: "🤖" },
    { name: "CS & BS", icon: "📊" }
  ];

  const [notesCount, setNotesCount] = useState({});

  useEffect(() => {

    const fetchCounts = async () => {
      const counts = {};

      for (let dep of departments) {
        try {
          const res = await axios.get(
            `https://enginote-production.up.railway.app/api/notes/count/${encodeURIComponent(dep.name)}`
          );
          counts[dep.name] = res.data.count;
        } catch {
          counts[dep.name] = 0;
        }
      }

      setNotesCount(counts);
    };

    fetchCounts();

  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 px-4 py-10 md:p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">

        {/* 🔥 DASHBOARD TITLE */}
        <h1 className="text-4xl font-bold text-center mb-12 
        text-cyan-300 drop-shadow-[0_0_12px_#00ffff] tracking-wide">
          ENGINOTE DASHBOARD
        </h1>

        {/* DEPARTMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {departments.map((dep, index) => (

            <motion.div
              key={dep.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.05 }}
            >

              <div className="p-8 rounded-2xl 
              bg-gradient-to-br from-blue-500/20 to-cyan-400/10 
              backdrop-blur-xl border border-cyan-300/20 
              shadow-[0_0_25px_rgba(0,255,255,0.15)]
              flex flex-col justify-between h-[260px]">

                <div className="text-4xl">{dep.icon}</div>

                <h2 className="text-xl font-bold text-white">
                  {dep.name}
                </h2>

                <p className="text-cyan-300 font-semibold text-sm">
                  {notesCount[dep.name] || 0} Notes
                </p>

                <Link
                  to={`/department/${encodeURIComponent(dep.name)}`}
                  className="mt-4 text-center border border-cyan-400 text-cyan-400 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition"
                >
                  Enter Department
                </Link>

              </div>

            </motion.div>

          ))}

        </div>

        {/* 🔥 TOP CONTRIBUTORS */}
        <div className="mt-24">

          <h2 className="text-3xl font-bold text-center mb-8 
          text-cyan-300 drop-shadow-[0_0_10px_#00ffff] tracking-wide">
            TOP CONTRIBUTORS
          </h2>

          <Leaderboard />

        </div>

        {/* 🔥 TOP RATED NOTES */}
        <div className="mt-20">

          <h2 className="text-3xl font-bold text-center mb-8 
          text-cyan-300 drop-shadow-[0_0_10px_#00ffff] tracking-wide">
            TOP RATED NOTES
          </h2>

          <TopRatedNotes />

        </div>

      </div>
    </>
  );
}