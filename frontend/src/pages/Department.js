import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DepartmentLeaderboard from "../components/DepartmentLeaderboard";
import DepartmentTopRated from "../components/DepartmentTopRated";
import AiAssistant from "../components/AiAssistant";

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

  // 🎯 Adjusted radius for mobile
  const radius = isMobile ? 90 : 180;

  return (

    <div className="min-h-screen flex flex-col items-center justify-start pt-10 px-4 
    bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden">

      {/* TITLE */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-12 text-center">
        {name} Department
      </h1>

      {/* 🔥 MOBILE QUICK ACCESS (SEM 1 & 2) */}
      {isMobile && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => navigate(`/department/${name}/semester/1`)}
            className="px-4 py-2 bg-cyan-400 text-black rounded-full font-semibold"
          >
            SEM 1
          </button>

          <button
            onClick={() => navigate(`/department/${name}/semester/2`)}
            className="px-4 py-2 bg-cyan-400 text-black rounded-full font-semibold"
          >
            SEM 2
          </button>
        </div>
      )}

      {/* WHEEL */}
      <div className="relative 
      w-[260px] h-[260px] 
      sm:w-[450px] sm:h-[450px] 
      overflow-hidden">

        <div className={`absolute w-full h-full ${!isMobile ? "animate-wheel" : ""}`}>

          {semesters.map((sem, index) => {

            const angle = (360 / semesters.length) * index;
            const rad = angle * (Math.PI / 180);

            const safeRadius = isMobile ? radius * 0.8 : radius;

            const x = safeRadius * Math.cos(rad);
            const y = safeRadius * Math.sin(rad);

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
                w-10 h-10 sm:w-20 sm:h-20
                text-[10px] sm:text-base
                rounded-full 
                bg-white/10 backdrop-blur-lg 
                border border-white/20 
                flex items-center justify-center 
                hover:scale-110 hover:bg-cyan-400 hover:text-black
                transition duration-300"
              >
                {sem}
              </button>

            );

          })}

        </div>

        {/* CENTER BADGE */}
        <div
          className="
          absolute top-1/2 left-1/2
          w-16 h-16 sm:w-28 sm:h-28
          -translate-x-1/2 -translate-y-1/2
          bg-gradient-to-r from-cyan-400 to-purple-500
          rounded-full
          flex items-center justify-center
          text-[10px] sm:text-sm font-bold
          text-black
          shadow-[0_0_20px_#00ffff] sm:shadow-[0_0_40px_#00ffff]
          leading-tight px-2"
        >
          {name}
        </div>

      </div>

      {/* LEADERBOARD + TOP RATED */}
      <div className="mt-12 sm:mt-20 w-full max-w-4xl space-y-8 sm:space-y-10">

        <DepartmentLeaderboard department={name} />
        <DepartmentTopRated department={name} />

      </div>

      {/* FLOATING AI BUTTON */}
      <div className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10">
        
      </div>

    </div>

  );

}