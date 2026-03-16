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
        `http://localhost:5000/api/notes/top-rated/${department}`
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

      <h2 className="text-3xl font-bold text-center mb-10 
      bg-gradient-to-r text-white 
      bg-clip-text text-transparent">
         {department} TOP RATED NOTES
      </h2>

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