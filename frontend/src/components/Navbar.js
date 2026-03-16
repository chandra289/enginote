import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const menuRef = useRef(null);

  /* READ USER FROM LOCAL STORAGE */

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const username = user?.name || "User";
  const role = user?.role;

  const profileImage = localStorage.getItem("profileImage");

  useEffect(() => {
    if (profileImage) {
      setImage(profileImage);
    }
  }, [profileImage]);

  /* LOGOUT */

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* PROFILE IMAGE UPLOAD */

  const handleImageUpload = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      localStorage.setItem("profileImage", reader.result);
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  /* CLOSE DROPDOWN IF CLICK OUTSIDE */

  useEffect(() => {

    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);

  }, []);

  /* SCROLL FUNCTION */

  const handleScroll = (id) => {

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  };

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b0b2b] border-b border-white/10">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* LOGO */}

        <h1
          className="text-3xl font-bold text-white cursor-pointer"
          onClick={() => handleScroll("dashboard")}
        >
          ENGI<span className="text-cyan-400">NOTE</span>
        </h1>


        {/* MENU */}

        <div className="hidden md:flex gap-10 text-gray-300 text-lg font-bold uppercase">

          <button
            onClick={() => handleScroll("dashboard")}
            className="hover:text-cyan-400"
          >
            Dashboard
          </button>

          <button
            onClick={() => handleScroll("contributors")}
            className="hover:text-cyan-400"
          >
            Top Contributors
          </button>

          <button
            onClick={() => handleScroll("topnotes")}
            className="hover:text-cyan-400"
          >
            Top Ranked Notes
          </button>

        </div>


        {/* PROFILE */}

        <div className="relative" ref={menuRef}>

          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer"
          >

            {image ? (

              <img
                src={image}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />

            ) : (

              <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-black font-bold">
                {username.charAt(0).toUpperCase()}
              </div>

            )}

            <span className="text-white text-lg font-bold uppercase">
              {username}
            </span>

          </div>


          {/* DROPDOWN */}

          {open && (

            <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl overflow-hidden">

              <label className="block px-5 py-3 text-gray-700 cursor-pointer hover:bg-gray-100">
                Upload Profile Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>

              <button
                onClick={() => { navigate("/profile"); setOpen(false); }}
                className="block w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={() => { navigate("/my-uploads"); setOpen(false); }}
                className="block w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-100"
              >
                My Uploads
              </button>

              <button
                onClick={() => { navigate("/settings"); setOpen(false); }}
                className="block w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </button>


              {/* ADMIN PANEL */}

              {role === "superadmin" && (

                <button
                  onClick={() => { navigate("/admin"); setOpen(false); }}
                  className="block w-full text-left px-5 py-3 text-purple-600 font-semibold hover:bg-gray-100"
                >
                  Admin Panel
                </button>

              )}


              <div className="border-t"></div>

              <button
                onClick={logout}
                className="block w-full text-left px-5 py-3 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}