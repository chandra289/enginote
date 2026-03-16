import { useParams, useNavigate } from "react-router-dom";
import DepartmentLeaderboard from "../components/DepartmentLeaderboard";
import DepartmentTopRated from "../components/DepartmentTopRated";
import AiAssistant from "../components/AiAssistant";

export default function Department() {

  const { name } = useParams();
  const navigate = useNavigate();

  const semesters = [
    "SEM 1",
    "SEM 2",
    "SEM 3",
    "SEM 4",
    "SEM 5",
    "SEM 6",
    "SEM 7",
    "SEM 8"
  ];

  const radius = 180;

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">
        
      {/* PAGE TITLE */}

      <h1 className="text-4xl font-bold mb-16 text-center">
        {name} Department
      </h1>


      {/* SEMESTER WHEEL */}

      <div className="relative w-[450px] h-[450px]">

        <div className="absolute w-full h-full animate-wheel">

          {semesters.map((sem, index) => {

            const angle = (360 / semesters.length) * index;
            const rad = angle * (Math.PI / 180);

            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);

            return (

              <button
                key={sem}
                onClick={() =>
                  navigate(`/department/${name}/semester/${index + 1}`)
                }
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)"
                }}
                className="w-20 h-20 rounded-full 
                bg-white/10 backdrop-blur-lg 
                border border-white/20 
                flex items-center justify-center 
                hover:scale-110 hover:bg-cyan-400 hover:text-black
                transition duration-300"
              >

                <span className="animate-counter font-semibold">
                  {sem}
                </span>

              </button>

            );

          })}

        </div>


        {/* CENTER DEPARTMENT BADGE */}

        <div
          className="absolute top-1/2 left-1/2
          w-28 h-28
          -translate-x-1/2 -translate-y-1/2
          bg-gradient-to-r from-cyan-400 to-purple-500
          rounded-full
          flex items-center justify-center
          text-center text-sm font-bold
          text-black
          shadow-[0_0_40px_#00ffff]
          leading-tight px-2"
        >

          {name}

        </div>

      </div>


      {/* LEADERBOARD + TOP RATED */}

      <div className="mt-24 w-full max-w-4xl space-y-10">

        <DepartmentLeaderboard department={name} />

        <DepartmentTopRated department={name} />

        

      </div>

    </div>

  );

}