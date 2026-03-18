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

export default function DepartmentLeaderboard({ department }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, [department]);

  const fetchLeaderboard = async () => {

    try {

      const res = await axios.get(
        `https://enginote-production.up.railway.app/api/leaderboard/department/${department}`
      );

      const formatted = res.data.map((user, index) => ({
        rank: index + 1,
        name: user._id,
        notes: user.totalNotes
      }));

      setData(formatted);

    } catch (err) {

      console.log(err);

    }

  };

  const top3 = data.slice(0, 3);

  return (

    <div className="mt-20 p-10 rounded-2xl 
    bg-white/10 backdrop-blur-xl 
    border border-white/20 
    shadow-2xl">

      {/* Title */}

      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-center leading-tight px-2 text-white">
  {department} TOP
  <br />
  CONTRIBUTORS
      </h1>

      {/* Top 3 Contributors */}

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

            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee"/>
                <stop offset="100%" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>

            <XAxis dataKey="name" stroke="#ffffff"/>
            <YAxis stroke="#ffffff"/>

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #22d3ee",
                borderRadius: "10px"
              }}
            />

            <Bar
              dataKey="notes"
              fill="url(#barGradient)"
              radius={[12,12,0,0]}
              animationDuration={1200}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}