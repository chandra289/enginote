import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [users, setUsers] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`   // ✅ IMPORTANT
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTotalNotes();
    fetchNotes();
  }, []);


  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://enginote-production.up.railway.app/api/admin/users/count",
        config
      );
      setUsers(res.data.count);
    } catch (err) {
      console.error("Error fetching users", err.response);
    }
  };


  const fetchTotalNotes = async () => {
    try {
      const res = await axios.get(
        "https://enginote-production.up.railway.app/api/admin/notes/count",
        config
      );
      setTotalNotes(res.data.count);
    } catch (err) {
      console.error("Error fetching notes", err.response);
    }
  };


  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "https://enginote-production.up.railway.app/api/admin/notes",
        config
      );
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err.response);
    }
  };


  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `https://enginote-production.up.railway.app/api/admin/notes/${id}`,
        config
      );
      fetchNotes();
      fetchTotalNotes();
    } catch (err) {
      console.error("Delete failed", err.response);
    }
  };

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      <p>Total Users: {users}</p>
      <p>Total Notes: {totalNotes}</p>

      {notes.map(note => (
        <div key={note._id}>
          <h3>{note.subject}</h3>
          <button onClick={() => deleteNote(note._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}