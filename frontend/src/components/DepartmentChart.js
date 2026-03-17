import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DepartmentChart() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const res = await axios.get(
          "https://enginote-production.up.railway.app/api/notes/stats/departments"
        );

        const formatted = res.data.map(item => ({
          department: item._id,
          notes: item.totalNotes
        }));

        setData(formatted);
        console.log(res.data);


      } catch (err) {

        console.log(err);

      }

    };

    fetchStats();

   
  }, []);

  return (

    <div className="mt-24 p-10 rounded-2xl 
    bg-white/10 backdrop-blur-xl 
    border border-white/20 
    shadow-2xl">

  <h2 className="text-3xl font-bold text-center mb-8 
  bg-gradient-to-r from-cyan-400 to-purple-500 
  bg-clip-text text-transparent tracking-wide">
    DEPARTMENT CONTRIBUTION
  </h2>

  <ResponsiveContainer width="100%" height={300}>

    <BarChart data={data}>

      <XAxis dataKey="department" stroke="#fff" />
      <YAxis stroke="#fff" />

      <Tooltip
  cursor={{ fill: "transparent" }}
  contentStyle={{
    backgroundColor: "#0f172a",
    border: "1px solid #22d3ee",
    borderRadius: "10px",
    color: "#fff"
  }}
  labelStyle={{ color: "#22d3ee" }}
/>

      <Bar
        dataKey="notes"
        fill="#22d3ee"
        radius={[8,8,0,0]}
        animationDuration={1200}
      />

    </BarChart>

  </ResponsiveContainer>

</div>

  );
}