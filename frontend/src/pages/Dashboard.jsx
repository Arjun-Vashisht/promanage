import { useEffect, useState } from "react";
import api from "../api/axios";

import MainLayout from "../layouts/MainLayout";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import CreateTaskForm from "../components/CreateTaskForm";
import KanbanBoard from "../components/KanbanBoard";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await api.get("projects/");
    setProjects(res.data);
  };

  const fetchTasks = async (projectId) => {
    const res = await api.get(`tasks/?project_id=${projectId}`);
    setTasks(res.data);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    fetchTasks(project.id);
  };

  const updateTaskStatus = async (taskId, status) => {
    await api.patch(`tasks/${taskId}/`, { status });

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status } : t
      )
    );
  };

  return (
    <MainLayout>
      <Sidebar
        projects={projects}
        selectedProject={selectedProject}
        onSelect={handleProjectSelect}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">
          {selectedProject
            ? selectedProject.name
            : "Select a project"}
        </h1>

        {!selectedProject && (
            <p className="text-gray-500">
                Choose a project from the sidebar to view tasks.
            </p>
        )}

        {selectedProject && (
            <button
                onClick={() => setShowModal(true)}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                + New Task
            </button>
        )}


        {selectedProject && (
            <KanbanBoard tasks={tasks} setTasks={setTasks} />
        )}

      </main>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreateTaskForm
            projectId={selectedProject?.id}
            onCreated={(task) => {
            setTasks((prev) => [task, ...prev]);
            setShowModal(false);
            }}
        />
       </Modal>

    </MainLayout>
  );
};

export default Dashboard;
