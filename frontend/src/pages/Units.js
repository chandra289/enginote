import { useParams, useNavigate } from "react-router-dom";

export default function Units() {

  const { name, sem, subject } = useParams();
  const navigate = useNavigate();

  const units = [
    "Unit 1",
    "Unit 2",
    "Unit 3",
    "Unit 4",
    "Unit 5"
  ];

  return (

    <div className="min-h-screen p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">

      <h1 className="text-3xl font-bold text-center mb-6">
        {subject}
      </h1>

      <h2 className="text-xl text-center mb-12">
        {name} - Semester {sem}
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

        {units.map((unit,index)=>(

          <div
            key={unit}
            onClick={() =>
              navigate(`/department/${name}/semester/${sem}/subject/${subject}/unit/${index+1}`)
            }
            className="cursor-pointer bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-xl hover:scale-105 transition text-center"
          >

            <h3 className="text-2xl font-semibold">
              {unit}
            </h3>

          </div>

        ))}

      </div>

    </div>

  );

}