
import Navbar from "../components/Navbar";

export default function Profile(){

  const user = localStorage.getItem("user");

  return(

    <>
      <Navbar />

      <div className="min-h-screen pt-28 p-10 text-white">

        <h1 className="text-3xl font-bold mb-6">
          Profile
        </h1>

        <p className="text-lg">
          Username: {user}
        </p>

      </div>
    </>

  )

}

