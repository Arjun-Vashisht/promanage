import { useEffect, useState } from "react";
import api from "../api/axios";

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
      <div className="p-6">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg">

      <h1 className="text-2xl font-bold mb-4">
        User Profile
      </h1>

      <div className="bg-white shadow rounded p-4 space-y-2">

        <div>
          <span className="font-semibold">Username:</span>
          {" "}
          {user.username}
        </div>

        <div>
          <span className="font-semibold">Email:</span>
          {" "}
          {user.email}
        </div>

        <div>
          <span className="font-semibold">Joined:</span>
          {" "}
          {new Date(user.date_joined).toLocaleString()}
        </div>

      </div>

    </div>
  );
}
