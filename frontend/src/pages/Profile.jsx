import { useEffect, useState } from "react";
import api from "../api/axios";
import { User } from "lucide-react";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("users/profile/");
      setUser(res.data);
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-600 dark:text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="
      p-6
      min-h-screen
      bg-gray-100 dark:bg-gray-900
      transition-colors
      flex justify-center
    ">

      <div className="
        w-full max-w-xl
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-xl
        shadow-sm
        p-8
      ">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">

          <div className="
            h-14 w-14
            rounded-full
            bg-indigo-600
            flex items-center justify-center
            text-white
          ">
            <User size={24} />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {user.username}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              User Profile
            </p>
          </div>

        </div>

        {/* Info Section */}
        <div className="space-y-4">

          <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Username
            </span>
            <span className="text-gray-900 dark:text-gray-100">
              {user.username}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Email
            </span>
            <span className="text-gray-900 dark:text-gray-100">
              {user.email || "Not provided"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              Joined
            </span>
            <span className="text-gray-900 dark:text-gray-100">
              {new Date(user.date_joined).toLocaleString()}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
