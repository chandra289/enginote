import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [users, setUsers] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [notes, setNotes] = useState([]);

  useEffect(() => {

    fetchUsers();
    fetchTotalNotes();
    fetchNotes();

  }, []);


  /* TOTAL USERS */

  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://enginote-production.up.railway.app/api/admin/users/count"
      );

      setUsers(res.data.count);

    } catch (err) {

      console.error("Error fetching users");

    }

  };


  /* TOTAL NOTES */

  const fetchTotalNotes = async () => {

    try {

      const res = await axios.get(
        "http://enginote-production.up.railway.app/api/admin/notes/count"
      );

      setTotalNotes(res.data.count);

    } catch (err) {

      console.error("Error fetching notes");

    }

  };


  /* ALL NOTES */

  const fetchNotes = async () => {

    try {

      const res = await axios.get(
        "http://enginote-production.up.railway.app/api/admin/notes"
      );

      setNotes(res.data);

    } catch (err) {

      console.error("Error fetching notes list");

    }

  };


  /* DELETE NOTE */

  const deleteNote = async (id) => {

    try {

      await axios.delete(
        `https://enginote-production.up.railway.app/api/admin/notes/${id}`
      );

      fetchNotes();
      fetchTotalNotes();

    } catch (err) {

      console.error("Delete failed");

    }

  };


  return (

    <div className="min-h-screen px-4 py-10 md:p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>


      {/* ANALYTICS CARDS */}

      <div className="grid md:grid-cols-3 gap-8 mb-10">

        {/* TOTAL USERS */}

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">

          <h2 className="text-xl font-bold">
            👥 Total Users
          </h2>

          <p className="text-3xl mt-2">
            {users}
          </p>

        </div>


        {/* TOTAL NOTES */}

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">

          <h2 className="text-xl font-bold">
            📄 Total Notes
          </h2>

          <p className="text-3xl mt-2">
            {totalNotes}
          </p>

        </div>


        {/* PLATFORM STATUS */}

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">

          <h2 className="text-xl font-bold">
            ⭐ Platform Status
          </h2>

          <p className="text-lg mt-2">
            EngiNote Running
          </p>

        </div>

      </div>


      {/* NOTES MANAGEMENT */}

      <h2 className="text-2xl mb-6">
        Uploaded Notes
      </h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {notes.map((note) => (

          <div
            key={note._id}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl"
          >

            <h3 className="font-bold text-lg">
              {note.subject}
            </h3>

            <p className="text-sm text-gray-300">
              {note.department}
            </p>

            <p className="text-sm text-gray-400">
              Unit {note.unit}
            </p>


            <button
              onClick={() => deleteNote(note._id)}
              className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Delete Note
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}