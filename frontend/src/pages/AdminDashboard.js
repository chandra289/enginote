import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [users, setUsers] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [notes, setNotes] = useState([]);

  // ✅ BASE URL (IMPORTANT)
  const API = "https://enginote-production.up.railway.app";

  // ✅ GET TOKEN
  const token = localStorage.getItem("token");

  // ✅ AXIOS CONFIG
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTotalNotes();
    fetchNotes();
  }, []);


  /* 🔹 FETCH USERS COUNT */
  const fetchUsers = async () => {
    try {

      const res = await axios.get(
        `${API}/api/admin/users/count`,
        config
      );

      setUsers(res.data.count);

    } catch (err) {
      console.error("Error fetching users:", err.response || err.message);
    }
  };


  /* 🔹 FETCH TOTAL NOTES */
  const fetchTotalNotes = async () => {
    try {

      const res = await axios.get(
        `${API}/api/admin/notes/count`,
        config
      );

      setTotalNotes(res.data.count);

    } catch (err) {
      console.error("Error fetching notes:", err.response || err.message);
    }
  };


  /* 🔹 FETCH ALL NOTES */
  const fetchNotes = async () => {
    try {

      const res = await axios.get(
        `${API}/api/admin/notes`,
        config
      );

      setNotes(res.data);

    } catch (err) {
      console.error("Error fetching notes list:", err.response || err.message);
    }
  };


  /* 🔹 DELETE NOTE */
  const deleteNote = async (id) => {
    try {

      await axios.delete(
        `${API}/api/admin/notes/${id}`,
        config
      );

      // refresh data
      fetchNotes();
      fetchTotalNotes();

    } catch (err) {
      console.error("Delete failed:", err.response || err.message);
    }
  };


  return (
    <div className="min-h-screen text-white p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <div className="bg-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-bold">👥 Total Users</h2>
          <p className="text-3xl mt-2">{users}</p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl">
          <h2 className="text-xl font-bold">📄 Total Notes</h2>
          <p className="text-3xl mt-2">{totalNotes}</p>
        </div>

      </div>

      {/* NOTES LIST */}
      <h2 className="text-2xl mb-6">Uploaded Notes</h2>

      <div className="grid md:grid-cols-3 gap-6">

        {notes.length === 0 ? (
          <p>No notes available</p>
        ) : (
          notes.map((note) => (

            <div
              key={note._id}
              className="bg-white/10 p-6 rounded-xl"
            >
              <h3 className="font-bold text-lg">{note.subject}</h3>
              <p className="text-sm text-gray-300">{note.department}</p>
              <p className="text-sm text-gray-400">Unit {note.unit}</p>

              <button
                onClick={() => deleteNote(note._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>

          ))
        )}

      </div>

    </div>
  );
}