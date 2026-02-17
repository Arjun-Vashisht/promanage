import { Link } from "react-router-dom";

const Navbar = () => {

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");

    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between items-center bg-white border-b px-6 py-3 shadow-sm">

      {/* Left side */}
      <h1 className="font-semibold text-lg text-blue-600">
        <Link to="/">ProManage</Link>
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-4">

        <Link
            to="/profile"
            className="text-blue-600 hover:underline"
        >
            {username}
        </Link>

        <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
        >
            Logout
        </button>

      </div>


    </div>
  );
};

export default Navbar;
