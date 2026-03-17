import { useEffect, useState } from "react";
import axios from "axios";

export default function TopRatedNotes() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchTopRated();
  }, []);

  const fetchTopRated = async () => {

    try {

      const res = await axios.get(
        "https://enginote-production.up.railway.app/api/notes/top-rated"
      );

      setNotes(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="
mt-24 p-12 rounded-3xl
bg-gradient-to-br from-[#1f2147]/80 to-[#2a2d63]/60
backdrop-blur-3xl
border border-white/20
shadow-[0_10px_50px_rgba(0,0,0,0.45)]
relative overflow-hidden
">

      {/* Title */}

      <h2 className="text-3xl font-bold text-center mb-12 
      bg-gradient-to-r from-cyan-400 to-purple-500 
      bg-clip-text text-transparent tracking-wide">
        TOP RATED NOTES
      </h2>

      {/* Notes Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {notes.map((note, index) => {

          const avgRating =
            note.ratings && note.ratings.length > 0
              ? (
                  note.ratings.reduce((sum, r) => sum + r.value, 0) /
                  note.ratings.length
                ).toFixed(1)
              : "0";

          return (

            <div
              key={note._id}
              className="
              relative p-6 rounded-2xl
              bg-gradient-to-br from-white/10 to-white/5
              backdrop-blur-2xl
              border border-white/20
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]
              transition-all duration-300
              hover:scale-[1.05]
              
              
              "
            >

              {/* Rank Badge */}

              <div className="absolute top-3 right-3 
              text-xs font-bold 
              bg-cyan-400/20 
              text-cyan-300 
              px-2 py-1 rounded-md">
                #{index + 1}
              </div>

              {/* Subject */}

              <h3 className="text-white text-lg font-semibold mb-2">
                {note.subject}
              </h3>

              {/* Department */}

              <p className="text-gray-300 text-sm">
                Department: {note.department}
              </p>

              {/* Rating */}

              <p className="text-yellow-400 mt-3 text-lg font-semibold">
                ⭐ {avgRating}
              </p>

              {/* Uploader */}

              <p className="text-gray-400 text-sm mt-1">
                Uploaded by {note.uploadedBy}
              </p>

            </div>

          );

        })}

      </div>

    </div>

  );

}