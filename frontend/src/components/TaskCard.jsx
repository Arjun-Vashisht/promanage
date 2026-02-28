import { User } from "lucide-react";

const priorityColors = {
  LOW: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  HIGH: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
};

const TaskCard = ({ task, onStatusChange }) => {

  return (
    <div
      className="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-xl
        p-4
        shadow-sm dark:shadow-none
        hover:shadow-md dark:hover:bg-gray-800/70
        transition-all duration-200
      "
    >

      {/* Header */}
      <div className="flex justify-between items-center mb-3">

        <span className="text-xs text-gray-400 dark:text-gray-500">
          #{task.id}
        </span>

        <span
          className={`
            text-xs px-2 py-1 rounded-full font-medium
            ${priorityColors[task.priority]}
          `}
        >
          {task.priority}
        </span>

      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">

        {/* Assigned User */}
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <User size={14} />
          <span>
            {task.assigned_username || "Unassigned"}
          </span>
        </div>

        {/* Status Dropdown */}
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value)
          }
          className="
            text-xs border border-gray-300 dark:border-gray-700
            rounded-md px-2 py-1
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-200
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            transition
          "
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

      </div>

    </div>
  );
};

export default TaskCard;
