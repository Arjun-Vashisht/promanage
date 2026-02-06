const TaskCard = ({ task, onStatusChange }) => {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm hover:shadow transition">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{task.title}</h3>
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
