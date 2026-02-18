export default function Navbar() {

  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (

    <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">

      <div className="text-gray-800 font-medium">
        Welcome, {username}
      </div>

      <button
        className="
          px-4 py-2
          bg-indigo-600
          text-white
          rounded-md
          hover:bg-indigo-700
          transition
        "
      >
        Logout
      </button>

    </div>

  );

}
