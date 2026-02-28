import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="
      min-h-screen
      flex items-center justify-center
      bg-gray-100 dark:bg-gray-950
      transition-colors
    ">

      <div className="
        w-full max-w-md
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        shadow-lg
        rounded-xl
        p-8
      ">

        <h2 className="
          text-2xl font-semibold mb-6 text-center
          text-gray-900 dark:text-gray-100
        ">
          Welcome Back
        </h2>

        {error && (
          <div className="
            mb-4 p-3 rounded-md
            bg-red-100 dark:bg-red-900/40
            text-red-600 dark:text-red-300
            text-sm
          ">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="
              w-full
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-200
              rounded-lg px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-200
              rounded-lg px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition
            "
          />

          {/* Button */}
          <button
            type="submit"
            className="
              w-full
              bg-indigo-600 text-white
              py-2 rounded-lg
              hover:bg-indigo-700
              transition
              font-medium
            "
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;
