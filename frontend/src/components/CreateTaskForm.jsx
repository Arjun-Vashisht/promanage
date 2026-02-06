import { useState } from "react";
import api from "../api/axios";

const CreateTaskForm = ({ projectId, onCreated }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await api.post("tasks/", {
      title,
      priority,
      project: projectId,
    });

    onCreated(res.data);
    setLoading(false);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Create Task</h2>

      <input
        className="w-full border rounded px-3 py-2 mb-3"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select
        className="w-full border rounded px-3 py-2 mb-4"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};

export default CreateTaskForm;
