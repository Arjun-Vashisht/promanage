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

    // make a deep copy
    const updatedTasks = [...tasks];

    // find dragged task
    const draggedTaskIndex = updatedTasks.findIndex(
        t => t.id.toString() === draggableId
    );

    const draggedTask = {
        ...updatedTasks[draggedTaskIndex]
    };

    // remove from old position
    updatedTasks.splice(draggedTaskIndex, 1);

    // update status
    draggedTask.status = destStatus;

    // insert into new position
    const destTasks = updatedTasks
        .filter(t => t.status === destStatus);

    destTasks.splice(destIndex, 0, draggedTask);

    // rebuild order for that column
    const reorderedTasks = updatedTasks.map(task => {

        if (task.status !== destStatus) return task;

        const index = destTasks.findIndex(t => t.id === task.id);

        if (index !== -1) {
        return {
            ...task,
            order: index
        };
        }

        return task;
    });

    // optimistic UI update
    setTasks([
        ...reorderedTasks,
        draggedTask
    ]);

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
      <div className="grid grid-cols-3 gap-4">

        {Object.entries(columns).map(([status, title]) => (

          <Droppable droppableId={status} key={status}>

            {(provided) => (

              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 rounded p-3 min-h-[400px]"
              >

                <h2 className="font-semibold mb-3">
                  {title}
                </h2>

                {grouped[status].map((task, index) => (

                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >

                    {(provided) => (

                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-3 mb-2 rounded shadow cursor-pointer"
                      >

                        {task.title}

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
