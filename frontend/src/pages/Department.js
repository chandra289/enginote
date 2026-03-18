import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DepartmentLeaderboard from "../components/DepartmentLeaderboard";
import DepartmentTopRated from "../components/DepartmentTopRated";


export default function Department() {

  const { name } = useParams();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const semesters = [
    "SEM 1","SEM 2","SEM 3","SEM 4",
    "SEM 5","SEM 6","SEM 7","SEM 8"
  ];

  const radius = isMobile ? 100 : 180;

  return (

    <div className="min-h-screen flex flex-col items-center 
    bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-x-hidden">

      {/* TITLE */}
      <h1 className="text-2xl sm:text-4xl font-bold mt-10 mb-10 text-center">
        {name} Department
      </h1>

      {/* WHEEL WRAPPER */}
      <div className="w-full flex justify-center">

        {/* WHEEL */}
        <div className="relative 
        w-[300px] h-[300px] 
        sm:w-[450px] sm:h-[450px] 
        mx-auto">

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
                  className="
                  w-12 h-12 sm:w-20 sm:h-20
                  text-xs sm:text-base
                  rounded-full 
                  bg-white/10 backdrop-blur-lg 
                  border border-white/20 
                  flex items-center justify-center 
                  hover:scale-110 hover:bg-cyan-400 hover:text-black
                  transition duration-300 text-center"
                >

                  {/* 🔥 TEXT FIX */}
                  <span className="rotate-fix font-semibold">
                    {sem}
                  </span>

                </button>

              );

            })}

          </div>

          {/* CENTER BADGE */}
          <div
            className="
            absolute top-1/2 left-1/2
            w-20 h-20 sm:w-28 sm:h-28
            -translate-x-1/2 -translate-y-1/2
            bg-gradient-to-r from-cyan-400 to-purple-500
            rounded-full
            flex items-center justify-center
            text-xs sm:text-sm font-bold
            text-black
            shadow-[0_0_25px_#00ffff] sm:shadow-[0_0_40px_#00ffff]"
          >
            {name}
          </div>

        </div>

      </div>

      {/* SECTIONS */}
      <div className="mt-16 w-full max-w-4xl px-3 sm:px-4 space-y-8">

        <DepartmentLeaderboard department={name} />
        <DepartmentTopRated department={name} />

      </div>

      {/* FLOATING AI BUTTON */}
      

    </div>

  );

}