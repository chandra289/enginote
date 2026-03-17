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
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="min-h-screen pt-24  px-4 py-10 md:p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">


        {/* DASHBOARD TITLE */}
        <h1
          id="dashboard"
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          ENGINOTE DASHBOARD
        </h1>

        {/* DEPARTMENT CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {departments.map((dep, index) => (

            <motion.div
              key={dep.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.05 }}
            >

              <div
                className="relative p-8 rounded-2xl 
                bg-white/10 backdrop-blur-lg 
                border border-white/20 
                shadow-xl hover:shadow-purple-500/40
                flex flex-col justify-between h-[260px]"
              >

                {/* ICON */}
                <div className="text-4xl">{dep.icon}</div>

                {/* DEPARTMENT NAME */}
                <h2 className="text-xl font-bold text-white">
                  {dep.name}
                </h2>

                {/* NOTES COUNT */}
                <p className="text-cyan-400 font-semibold text-sm">
                  {notesCount[dep.name] || 0} Notes
                </p>

                {/* ENTER BUTTON */}
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


        {/* TOP CONTRIBUTORS */}

        <div id="contributors" className="mt-24">
          <Leaderboard />
        </div>


        {/* TOP RATED NOTES */}

        <div id="topnotes" className="mt-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
          <TopRatedNotes />
        </div>

      </div>

    </>
  );
}