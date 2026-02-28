import { useEffect, useState } from "react";
import { Moon, Sun, LogOut } from "lucide-react";

export default function Navbar() {

  const username = localStorage.getItem("username");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");

    if (saved === "true") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }

    setDarkMode(!darkMode);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (

    <div className="
      bg-white dark:bg-gray-900
      border-b border-gray-200 dark:border-gray-800
      px-6 py-4
      flex justify-between items-center
      transition-colors
    ">

      {/* Left Section */}
      <div className="text-gray-800 dark:text-gray-200 font-medium">
        Welcome, <span className="font-semibold">{username}</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="
            text-gray-600 dark:text-gray-300
            hover:text-indigo-600 dark:hover:text-indigo-400
            transition
          "
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="
            flex items-center gap-2
            px-4 py-2
            bg-indigo-600
            text-white
            rounded-md
            hover:bg-indigo-700
            transition
          "
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

    </div>
  );
}
