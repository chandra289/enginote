import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Subjects() {

  const { name, sem } = useParams();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {

    const fetchSubjects = async () => {
      try {
        const res = await axios.get(
          
  `https://enginote-production.up.railway.app/api/subjects/${name.toUpperCase()}/${sem}`
);
        

        console.log("API DATA:", res.data); // 🔥 debug

        setSubjects(res.data);

      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    fetchSubjects();

  }, [name, sem]);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">

      <h1 className="text-3xl font-bold mb-10 text-center">
        {name} - Semester {sem} Subjects
      </h1>

      
        <div className="grid md:grid-cols-3 gap-6">

          {subjects.map(sub => (

            <div
              key={sub._id}
              onClick={() =>
                navigate(`/department/${name}/semester/${sem}/subject/${sub.subjectName}`)
              }
              className="cursor-pointer bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl hover:scale-105 transition"
            >

              <h3 className="text-xl font-semibold">
                {sub.subjectName}
              </h3>

              <p className="text-gray-400">
                {sub.subjectCode}
              </p>

            </div>

          ))}

        </div>
      

    </div>
  );
}