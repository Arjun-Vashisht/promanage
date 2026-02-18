const TaskCard = ({ task, onStatusChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-indigo-300 transition cursor-pointer">

      <div className="flex justify-between items-start">
        <div className="font-medium text-gray-900">{task.title}</div>
        <span className="text-xs px-2 py-1 rounded bg-gray-100">
          {task.priority}
        </span>
      </div>

      <div className="mt-4">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          className="w-full border rounded-md px-2 py-1 text-sm"
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
