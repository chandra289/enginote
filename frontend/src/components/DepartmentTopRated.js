import { useEffect, useState } from "react";
import axios from "axios";

export default function DepartmentTopRated({ department }) {

  const [notes, setNotes] = useState([]);

  useEffect(() => {

    fetchNotes();

  }, [department]);

  const fetchNotes = async () => {

    try {

      const res = await axios.get(
        `https://enginote-production.up.railway.app/api/notes/top-rated/${department}`
      );

      setNotes(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="mt-20 p-10 rounded-2xl 
    bg-white/10 backdrop-blur-xl 
    border border-white/20 
    shadow-2xl">

      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-center leading-tight px-2 text-white">
  {department} TOP
  <br />
  RATED NOTES
</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {notes.map((note, index) => (

          <div
            key={note._id}
            className="p-6 rounded-xl 
            bg-white/10 border border-white/20 
            backdrop-blur-lg hover:scale-105 transition"
          >

            <h3 className="text-white text-lg font-semibold">
              {note.subject}
            </h3>

            <p className="text-gray-300 text-sm">
              ⭐ {note.avgRating?.toFixed(1) || "0"}
            </p>

            <p className="text-gray-400 text-sm">
              Uploaded by {note.uploadedBy}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}