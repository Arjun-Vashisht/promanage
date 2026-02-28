import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

import api from "../api/axios";

const columns = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const KanbanBoard = ({ tasks, setTasks }) => {

  const grouped = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  };

  tasks.forEach(task => {
    grouped[task.status].push(task);
  });

  const onDragEnd = async (result) => {

    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    const sourceIndex = source.index;
    const destIndex = destination.index;

    const updatedTasks = [...tasks];

    const draggedTaskIndex = updatedTasks.findIndex(
      t => t.id.toString() === draggableId
    );

    const draggedTask = { ...updatedTasks[draggedTaskIndex] };

    updatedTasks.splice(draggedTaskIndex, 1);

    draggedTask.status = destStatus;

    const sameColumnTasks = updatedTasks.filter(
      t => t.status === destStatus
    );

    sameColumnTasks.splice(destIndex, 0, draggedTask);

    const finalTasks = updatedTasks
      .filter(t => t.status !== destStatus)
      .concat(sameColumnTasks);

    setTasks(finalTasks);

    try {
      await api.patch(`tasks/${draggedTask.id}/`, {
        status: destStatus,
        order: destIndex
      });
    } catch (error) {
      console.error("Order update failed", error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {Object.entries(columns).map(([status, title]) => (

          <Droppable droppableId={status} key={status}>
            {(provided) => (

              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="
                  bg-gray-100 dark:bg-gray-800
                  rounded-xl p-4
                  min-h-[450px]
                  border border-gray-200 dark:border-gray-700
                  transition-colors
                "
              >

                {/* Column Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200">
                    {title}
                  </h2>

                  <span className="
                    text-xs px-2 py-1 rounded-full
                    bg-gray-200 dark:bg-gray-700
                    text-gray-600 dark:text-gray-300
                  ">
                    {grouped[status].length}
                  </span>
                </div>

                {/* Tasks */}
                {grouped[status].map((task, index) => (

                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (

                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`
                          p-4 mb-3 rounded-lg
                          border border-gray-200 dark:border-gray-700
                          bg-white dark:bg-gray-900
                          text-gray-800 dark:text-gray-200
                          transition-all duration-200
                          ${
                            snapshot.isDragging
                              ? "shadow-lg scale-[1.02]"
                              : "hover:shadow-md"
                          }
                        `}
                      >
                        <div className="text-sm font-medium">
                          {task.title}
                        </div>

                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          #{task.id}
                        </div>

                      </div>

                    )}
                  </Draggable>

                ))}

                {provided.placeholder}

              </div>

            )}
          </Droppable>

        ))}

      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
