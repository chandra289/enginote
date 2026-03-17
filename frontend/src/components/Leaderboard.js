import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Leaderboard() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {

    try {

      const res = await axios.get(
        "https://enginote-production.up.railway.app/api/leaderboard/top-contributors"
      );

      const formatted = res.data.map((user, index) => ({
        rank: index + 1,
        name: user._id,
        notes: user.totalNotes
      }));

      setData(formatted);

    } catch (error) {

      console.log(error);

    }

  };

  const top3 = data.slice(0, 3);

  return (

    <div className="mt-24 p-10 rounded-2xl 
    bg-white/10 backdrop-blur-xl 
    border border-white/20 
    shadow-2xl">

      {/* Title */}

      <h2 className="text-3xl font-bold text-center mb-12 
      bg-gradient-to-r from-cyan-400 to-purple-500 
      bg-clip-text text-transparent">
        TOP CONTRIBUTORS
      </h2>

      {/* Top 3 */}

      <div className="flex justify-center gap-16 mb-12 text-xl font-semibold">

        {top3[0] && (
          <div className="text-yellow-400 text-2xl">
            🥇 {top3[0].name} — {top3[0].notes} Notes
          </div>
        )}

        {top3[1] && (
          <div className="text-gray-300 text-2xl">
            🥈 {top3[1].name} — {top3[1].notes} Notes
          </div>
        )}

        {top3[2] && (
          <div className="text-orange-400 text-2xl">
            🥉 {top3[2].name} — {top3[2].notes} Notes
          </div>
        )}

      </div>

      {/* Chart */}

      <div className="h-[360px]">

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={data}>

            {/* Gradient */}

            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                
              </linearGradient>
            </defs>

            {/* Axes */}

            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />

            {/* Tooltip */}

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #22d3ee",
                borderRadius: "10px",
                color: "#fff"
              }}
            />

            {/* Bars */}

            <Bar
              dataKey="notes"
              fill="url(#barGradient)"
              radius={[12, 12, 0, 0]}
              animationDuration={1200}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}