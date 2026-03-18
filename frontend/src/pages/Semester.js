import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Semester() {

  const { name, sem, subject, unit } = useParams();

  const [notes, setNotes] = useState([]);
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ Handle user name (JSON + string safe)
  const [uploaderName, setUploaderName] = useState(() => {
    const user = localStorage.getItem("user");
    try {
      const parsed = JSON.parse(user);
      return parsed?.name || "";
    } catch {
      return user || "";
    }
  });

  /* FETCH NOTES */
  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `https://enginote-production.up.railway.app/api/notes/${name}/${sem}/${subject}/${unit}`
      );
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [name, sem, subject, unit]);

  /* 🔥 REAL-TIME RATING (OPTIMISTIC UI) */
  const rateNote = async (noteId, rating) => {

    const user = uploaderName;

    // ⚡ instant UI update
    setNotes(prevNotes =>
      prevNotes.map(note => {

        if (note._id !== noteId) return note;

        const updatedRatings = note.ratings ? [...note.ratings] : [];

        const existing = updatedRatings.find(r => r.user === user);

        if (existing) {
          existing.value = rating;
        } else {
          updatedRatings.push({ user, value: rating });
        }

        return { ...note, ratings: updatedRatings };
      })
    );

    try {
      await axios.post(
        `https://enginote-production.up.railway.app/api/notes/rate/${noteId}`,
        { rating, user }
      );
    } catch (err) {
      console.log(err);

      // rollback if error
      fetchNotes();
    }
  };

  /* UPLOAD NOTE */
  const handleUpload = async () => {

    if (!uploaderName) {
      alert("Enter your name");
      return;
    }

    if (!files.length) {
      alert("Select file first");
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("department", name);
    formData.append("semester", sem);
    formData.append("subject", subject);
    formData.append("unit", unit);

    try {

      await axios.post(
        "https://enginote-production.up.railway.app/api/notes/uploads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      localStorage.setItem("user", uploaderName);

      alert("Uploaded successfully");

      setFiles([]);

      fetchNotes();

    } catch {
      alert("Upload failed");
    }
  };

  /* DELETE NOTE */
  const deleteNote = async (noteId) => {
    try {
      await axios.delete(
        `https://enginote-production.up.railway.app/api/notes/delete/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Note deleted");
      fetchNotes();

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="min-h-screen px-4 py-6 sm:p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">

      {/* HEADER */}
      <h1 className="text-xl sm:text-3xl font-bold mb-3 text-center break-words px-2">
        {name} - Semester {sem}
      </h1>

      <h2 className="text-lg sm:text-2xl text-cyan-400 font-semibold mb-8 text-center break-words px-2">
        {subject} - Unit {unit}
      </h2>

      {/* UPLOAD */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 
      p-4 sm:p-6 rounded-2xl mb-10 max-w-xl mx-auto">

        <h2 className="text-lg sm:text-xl mb-4 text-center">
          Upload Notes
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter your name"
            value={uploaderName}
            onChange={(e)=>setUploaderName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/20 text-white outline-none placeholder-gray-300"
          />

          <input
            type="file"
            multiple
            onChange={(e)=>setFiles(e.target.files)}
            className="w-full text-sm"
          />

          <button
            onClick={handleUpload}
            className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 
            p-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Upload Notes
          </button>

        </div>

      </div>

      {/* NOTES */}
      <h2 className="text-xl sm:text-2xl mb-6 text-center">
        Available Notes
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {notes.map(note => {

          const avgRating =
            note.ratings?.length > 0
              ? (
                  note.ratings.reduce((sum,r)=>sum+r.value,0) /
                  note.ratings.length
                ).toFixed(1)
              : "0.0";

          const userRating = note.ratings?.find(r => r.user === uploaderName)?.value;

          return (

            <div
              key={note._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl"
            >

              <h3 className="text-lg sm:text-xl font-semibold break-words">
                {note.subject}
              </h3>

              <p className="text-gray-300 mt-2 text-sm">
                Uploaded by: {note.uploadedBy}
              </p>

              {/* ⭐ RATING */}
              <p className="text-yellow-400 mt-2 font-semibold">
                ⭐ {avgRating} ({note.ratings?.length || 0})
              </p>

              <div className="flex gap-1 mt-2">

                {[1,2,3,4,5].map(star => (
                  <span
                    key={star}
                    onClick={()=>rateNote(note._id,star)}
                    className={`cursor-pointer text-xl ${
                      star <= userRating ? "text-yellow-400" : "text-gray-500"
                    }`}
                  >
                    ⭐
                  </span>
                ))}

              </div>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">

                <button
                  onClick={()=>setPreviewUrl(`https://enginote-production.up.railway.app/${note.pdfUrl}`)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                >
                  Preview
                </button>

                <a
                  href={`https://enginote-production.up.railway.app/${note.pdfUrl}`}
                  download
                  className="flex-1 text-center bg-gradient-to-r from-cyan-400 to-purple-500 py-2 rounded-lg text-black font-semibold"
                >
                  Download
                </a>

              </div>

              {/* DELETE */}
              {uploaderName === note.uploadedBy && (
                <button
                  onClick={()=>deleteNote(note._id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}

            </div>

          );

        })}

      </div>

      {/* PDF PREVIEW */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white w-[95%] sm:w-[80%] h-[80%] rounded-xl overflow-hidden relative">

            <button
              onClick={()=>setPreviewUrl(null)}
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>

            <iframe
              src={previewUrl}
              title="PDF Preview"
              className="w-full h-full"
            />

          </div>

        </div>
      )}

    </div>

  );
}