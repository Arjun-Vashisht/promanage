import { useEffect, useState } from "react";
import api from "../api/axios";

import MainLayout from "../layouts/MainLayout";
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
    try {
      const res = await api.get("projects/");
      setProjects(res.data);

      // Auto-select first project (professional UX)
      if (res.data.length > 0 && !selectedProject) {
        setSelectedProject(res.data[0]);
        fetchTasks(res.data[0].id);
      }

    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const res = await api.get(`tasks/?project_id=${projectId}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    fetchTasks(project.id);
  };

  return (
    <MainLayout>

      <div className="flex w-full">

        {/* Project list panel */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">

          <h2 className="text-sm font-semibold text-gray-500 mb-3">
            PROJECTS
          </h2>

          <div className="space-y-1">

            {projects.map((project) => {

              const active = selectedProject?.id === project.id;

              return (
                <button
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm transition
                    ${
                      active
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {project.name}
                </button>
              );

            })}

          </div>

        </div>

        {/* Main Kanban area */}
        <div className="flex-1 p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {selectedProject?.name || "Select a project"}
              </h1>

              <p className="text-sm text-gray-500">
                Manage tasks using Kanban board
              </p>
            </div>

            {selectedProject && (
              <button
                onClick={() => setShowModal(true)}
                className="
                  px-4 py-2
                  bg-indigo-600
                  text-white
                  rounded-md
                  hover:bg-indigo-700
                  transition
                  font-medium
                "
              >
                + New Task
              </button>
            )}

          </div>

          {!selectedProject && (
            <div className="text-gray-500">
              Select a project to view tasks
            </div>
          )}

          {selectedProject && (
            <KanbanBoard tasks={tasks} setTasks={setTasks} />
          )}

        </div>

      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <CreateTaskForm
          projectId={selectedProject?.id}
          onCreated={(task) => {
            setTasks((prev) => [...prev, task]);
            setShowModal(false);
          }}
        />
      </Modal>

    </MainLayout>
  );
};

export default Dashboard;
