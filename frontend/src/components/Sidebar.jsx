const Sidebar = ({ projects, selectedProject, onSelect }) => {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">ProManage</h2>
      </div>

      {/* Projects */}
      <div className="flex-1 overflow-y-auto p-3">
        <p className="text-xs uppercase text-gray-400 mb-2">
          Projects
        </p>

        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelect(project)}
            className={`px-3 py-2 rounded-md cursor-pointer mb-1 transition
              ${
                selectedProject?.id === project.id
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
          >
            {project.name}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
