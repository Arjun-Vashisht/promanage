import { useState } from "react";
import api from "../api/axios";

const CreateTaskForm = ({ projectId, onCreated, users }) => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("tasks/", {
        title,
        description,
        priority,
        project: projectId,
        assigned_to: assignedTo || null
      });

      onCreated(res.data);

      // Reset form
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setAssignedTo("");

    } catch (error) {
      console.error("Task creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Create Task
      </h2>

      {/* Title */}
      <input
        className="
          w-full border border-gray-300
          rounded-md px-3 py-2 mb-3
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Description */}
      <textarea
        className="
          w-full border border-gray-300
          rounded-md px-3 py-2 mb-3
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
      />

      {/* Priority */}
      <select
        className="
          w-full border border-gray-300
          rounded-md px-3 py-2 mb-3
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="LOW">Low Priority</option>
        <option value="MEDIUM">Medium Priority</option>
        <option value="HIGH">High Priority</option>
      </select>

      {/* Assign User */}
      <select
        className="
          w-full border border-gray-300
          rounded-md px-3 py-2 mb-4
          focus:outline-none focus:ring-2 focus:ring-indigo-500
        "
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Unassigned</option>

        {users?.map(user => (
          <option key={user.id} value={user.id}>
            {user.username}
          </option>
        ))}

      </select>

      {/* Submit Button */}
      <button
        disabled={loading}
        className="
          w-full
          bg-indigo-600
          text-white
          py-2
          rounded-md
          hover:bg-indigo-700
          transition
          font-medium
        "
      >
        {loading ? "Creating..." : "Create Task"}
      </button>

    </form>
  );
};

export default CreateTaskForm;
