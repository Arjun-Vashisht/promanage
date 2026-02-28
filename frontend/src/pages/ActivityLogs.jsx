import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
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
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">

      <div className="flex items-center gap-2 mb-6">
        <Activity className="text-indigo-600 dark:text-indigo-400" size={22} />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Activity Logs
        </h1>
      </div>

      <div className="
        bg-white dark:bg-gray-800
        rounded-xl
        border border-gray-200 dark:border-gray-700
        shadow-sm
        overflow-hidden
      ">

        {logs.length === 0 ? (
          <div className="p-6 text-gray-500 dark:text-gray-400 text-center">
            No activity yet.
          </div>
        ) : (
          logs.map((log, index) => (
            <div
              key={log._id || index}
              className="
                px-6 py-4
                border-b border-gray-200 dark:border-gray-700
                hover:bg-gray-50 dark:hover:bg-gray-700/50
                transition
              "
            >

              {/* Action */}
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {formatAction(log.action)}
              </div>

              {/* User */}
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                User ID: {log.user_id || "System"}
              </div>

              {/* Timestamp */}
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
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
