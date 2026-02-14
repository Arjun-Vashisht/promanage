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
        ProManage
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-4">

        <span className="text-gray-600 text-sm">
          Welcome, <strong>{username}</strong>
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;
