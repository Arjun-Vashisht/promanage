import { useEffect, useState } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await api.get("projects/");
    setProjects(data.data);
  };

  const fetchTasks = async (projectId) => {
    const data = await api.get(`tasks/?project_id=${projectId}`);
    setTasks(data.data);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    fetchTasks(project.id);
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    await api.patch(`tasks/${taskId}/`, {
        status: newStatus,
    });

    // update UI locally
    setTasks((prev) =>
        prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
        )
    );
};

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Projects */}
      <div style={{ width: "30%", borderRight: "1px solid #ddd", padding: 20 }}>
        <h3>Projects</h3>
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            style={{
              padding: 10,
              cursor: "pointer",
              background:
                selectedProject?.id === project.id ? "#eee" : "transparent",
            }}
          >
            {project.name}
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div style={{ flex: 1, padding: 20 }}>
        <h3>
          Tasks{" "}
          {selectedProject && `- ${selectedProject.name}`}
        </h3>

        {!selectedProject && <p>Select a project</p>}

        {tasks.map((task) => (
            <div
                key={task.id}
                style={{
                padding: 10,
                marginBottom: 10,
                border: "1px solid #ddd",
                }}
            >
                <strong>{task.title}</strong>

                <div>
                Status:
                <select
                    value={task.status}
                    onChange={(e) =>
                    updateTaskStatus(task.id, e.target.value)
                    }
                    style={{ marginLeft: 10 }}
                >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                </select>
                </div>

                <div>Priority: {task.priority}</div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
