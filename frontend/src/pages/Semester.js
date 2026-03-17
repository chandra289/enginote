import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Semester() {

  const { name, sem, subject, unit } = useParams();

  const [notes, setNotes] = useState([]);
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  const token = localStorage.getItem("token");

  const [uploaderName, setUploaderName] = useState(
    localStorage.getItem("user") || ""
  );


  /* FETCH NOTES */

  const fetchNotes = async () => {

    try {

      const res = await axios.get(
        `http://enginote-production.up.railway.app/api/notes/${name}/${sem}/${subject}/${unit}`
      );

      setNotes(res.data);

    } catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    fetchNotes();

  }, [name, sem, subject, unit]);



  /* RATE NOTE */

  const rateNote = async (noteId, rating) => {

    try {

      const user = localStorage.getItem("user");

      await axios.post(
        `http://enginote-production.up.railway.app/api/notes/rate/${noteId}`,
        { rating, user }
      );

      fetchNotes();

    } catch (err) {

      console.log(err);

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
        "http://enginote-production.up.railway.app/api/notes/upload",
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

<div className="min-h-screen p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white">

      <div className="relative z-10 ">

        <h1 className="text-3xl font-bold mb-3 text-center">
          {name} - Semester {sem}
        </h1>

        <h2 className="text-2xl text-cyan-400 font-semibold mb-10 text-center">
          {subject} - Unit {unit}
        </h2>



        {/* UPLOAD SECTION */}

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl mb-10">

          <h2 className="text-xl mb-4">
            Upload Notes
          </h2>

          <div className="grid gap-4">

            <input
              type="text"
              placeholder="Your Name"
              value={uploaderName}
              onChange={(e)=>setUploaderName(e.target.value)}
              className="p-3 rounded-lg bg-white/20 text-white outline-none"
            />

            <input
              type="file"
              multiple
              onChange={(e)=>setFiles(e.target.files)}
            />

            <button
              onClick={handleUpload}
              className="bg-gradient-to-r from-cyan-400 to-purple-500 p-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Upload Notes
            </button>

          </div>

        </div>



        {/* AVAILABLE NOTES */}

        <h2 className="text-2xl mb-6">
          Available Notes
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {notes.map(note => {

            const avgRating =
              note.ratings && note.ratings.length > 0
                ? (
                    note.ratings.reduce((sum,r)=>sum+r.value,0) /
                    note.ratings.length
                  ).toFixed(1)
                : "0.0";


            return (

              <div
                key={note._id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl"
              >

                <h3 className="text-xl font-semibold">
                  {note.subject}
                </h3>

                <p className="text-gray-300 mt-2">
                  Uploaded by: {note.uploadedBy}
                </p>



                {/* RATING */}

                <p className="text-yellow-400 mt-2 font-semibold">
                  ⭐ {avgRating} ({note.ratings?.length || 0})
                </p>

                <div className="flex gap-1 mt-2">

                  {[1,2,3,4,5].map(star => (
                    <span
                      key={star}
                      onClick={()=>rateNote(note._id,star)}
                      className="cursor-pointer text-yellow-400 text-xl"
                    >
                      ⭐
                    </span>
                  ))}

                </div>



                {/* BUTTONS */}

                <div className="flex gap-3 mt-4">

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



                {/* DELETE BUTTON */}

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

      </div>



      {/* PDF PREVIEW */}

      {previewUrl && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white w-[80%] h-[80%] rounded-xl overflow-hidden relative">

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