import { useEffect, useState } from "react";
import api from "../api/axios";
import { Trash2, Pencil } from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import Modal from "../components/Modal";
import CreateTaskForm from "../components/CreateTaskForm";
import KanbanBoard from "../components/KanbanBoard";

const Dashboard = () => {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);

  const [showTaskModal, setShowTaskModal] = useState(false);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [editingProject, setEditingProject] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [userFilter, setUserFilter] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  // ================= FETCH =================

  const fetchProjects = async () => {
    try {
      const res = await api.get("projects/");
      setProjects(res.data);

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

  const fetchUsers = async () => {
    try {
      const res = await api.get("users/list/");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ================= PROJECT CRUD =================

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    try {
      const res = await api.post("projects/", {
        name: newProjectName
      });

      setProjects(prev => [...prev, res.data]);
      setNewProjectName("");
      setShowProjectModal(false);

    } catch (error) {
      console.error("Project creation error:", error);
    }
  };

  const handleUpdateProject = async () => {
    if (!newProjectName.trim() || !editingProject) return;

    try {
      const res = await api.patch(
        `projects/${editingProject.id}/`,
        { name: newProjectName }
      );

      setProjects(prev =>
        prev.map(p =>
          p.id === editingProject.id ? res.data : p
        )
      );

      setEditingProject(null);
      setNewProjectName("");
      setShowProjectModal(false);

    } catch (error) {
      console.error("Project update error:", error);
    }
  };

  const openDeleteModal = (project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };

  const confirmDeleteProject = async () => {

    if (!projectToDelete) return;

    try {
      await api.delete(`projects/${projectToDelete.id}/`);

      setProjects(prev =>
        prev.filter(p => p.id !== projectToDelete.id)
      );

      if (selectedProject?.id === projectToDelete.id) {
        setSelectedProject(null);
        setTasks([]);
      }

    } catch (error) {
      console.error("Project delete error:", error);
    } finally {
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    fetchTasks(project.id);
  };

  // ================= FILTER =================

  const filteredTasks = tasks.filter(task => {
    if (!userFilter) return true;
    return task.assigned_to === Number(userFilter);
  });

  return (
    <MainLayout>

      <div className="flex w-full">

        {/* SIDEBAR */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">

          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-500">
              PROJECTS
            </h2>

            <button
              onClick={() => setShowProjectModal(true)}
              className="text-indigo-600 text-sm hover:underline"
            >
              + New
            </button>
          </div>

          <div className="space-y-1 flex-1 overflow-y-auto">

            {projects.map(project => {

              const active = selectedProject?.id === project.id;

              return (
                <div
                  key={project.id}
                  className={`
                    flex items-center justify-between
                    px-3 py-2 rounded-md text-sm transition
                    ${
                      active
                        ? "bg-indigo-50 text-indigo-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >

                  <button
                    onClick={() => handleProjectSelect(project)}
                    className="flex-1 text-left"
                  >
                    {project.name}
                  </button>

                  <div className="flex gap-2">

                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setNewProjectName(project.name);
                        setShowProjectModal(true);
                      }}
                      className="text-gray-400 hover:text-indigo-600 transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => openDeleteModal(project)}
                      className="text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>
              );

            })}

          </div>

        </div>

        {/* MAIN */}
        <div className="flex-1 p-6">

          <div className="flex justify-between items-center mb-6">

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
                onClick={() => setShowTaskModal(true)}
                className="
                  px-4 py-2
                  bg-indigo-600 text-white
                  rounded-md hover:bg-indigo-700
                  transition font-medium
                "
              >
                + New Task
              </button>
            )}

          </div>

          {/* USER FILTER */}
          {selectedProject && (
            <div className="mb-4">
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                className="border px-3 py-2 rounded-md"
              >
                <option value="">All Users</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!selectedProject && (
            <div className="text-gray-500">
              Select a project to view tasks
            </div>
          )}

          {selectedProject && (
            <KanbanBoard
              tasks={filteredTasks}
              setTasks={setTasks}
            />
          )}

        </div>

      </div>

      {/* TASK MODAL */}
      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
      >
        <CreateTaskForm
          projectId={selectedProject?.id}
          users={users}
          onCreated={(task) => {
            setTasks(prev => [...prev, task]);
            setShowTaskModal(false);
          }}
        />
      </Modal>

      {/* PROJECT CREATE / EDIT MODAL */}
      <Modal
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false);
          setEditingProject(null);
          setNewProjectName("");
        }}
      >
        <div>

          <h2 className="text-lg font-semibold mb-4">
            {editingProject ? "Edit Project" : "Create Project"}
          </h2>

          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Project name"
            className="
              w-full border border-gray-300
              rounded-md px-3 py-2 mb-4
              focus:ring-2 focus:ring-indigo-500
            "
          />

          <button
            onClick={
              editingProject
                ? handleUpdateProject
                : handleCreateProject
            }
            className="
              w-full bg-indigo-600 text-white
              py-2 rounded-md
              hover:bg-indigo-700 transition
            "
          >
            {editingProject ? "Update" : "Create"}
          </button>

        </div>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setProjectToDelete(null);
        }}
      >
        <div className="text-center">

          <h2 className="text-lg font-semibold mb-2">
            Delete Project
          </h2>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete
            <span className="font-semibold">
              {" "} {projectToDelete?.name} {" "}
            </span>
            ?
            <br />
            This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4">

            <button
              onClick={() => {
                setShowDeleteModal(false);
                setProjectToDelete(null);
              }}
              className="
                px-4 py-2
                bg-gray-200
                rounded-md
                hover:bg-gray-300
                transition
              "
            >
              Cancel
            </button>

            <button
              onClick={confirmDeleteProject}
              className="
                px-4 py-2
                bg-red-600
                text-white
                rounded-md
                hover:bg-red-700
                transition
              "
            >
              Delete
            </button>

          </div>

        </div>
      </Modal>

    </MainLayout>
  );
};

export default Dashboard;
