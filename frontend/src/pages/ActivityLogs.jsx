import { useEffect, useState } from "react";
import api from "../api/axios";

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get("activity-logs/");
      setLogs(res.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const formatAction = (action) => {
    switch(action) {
        case "TASK_CREATED":
        return "Task was created";
        case "TASK_UPDATED":
        return "Task was updated";
        default:
        return action;
    }
};


  return (
    <div className="p-6">

      <h1 className="text-2xl font-semibold mb-4">
        Activity Logs
      </h1>

      <div className="bg-white shadow rounded">

        {logs.length === 0 ? (
          <p className="p-4 text-gray-500">No activity yet.</p>
        ) : (
          logs.map((log) => (
            <div
              key={log._id}
              className="border-b p-4 hover:bg-gray-50"
            >
              <div className="font-medium">
                {formatAction(log.action)}
              </div>

              <div className="text-sm text-gray-500">
                User ID: {log.user_id}
              </div>

              <div className="text-sm text-gray-400">
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default ActivityLogs;
