import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../actions/taskActions";
import { Badge } from "@chakra-ui/react";
const TasksContainer = ({ socket }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.getTask());
  }, []);
  
  const tasks = useSelector((store) => {
    console.log("store", store);
    return store.taskReducer.tasks[0];
  });
  // useEffect(() => {
  // 	socket.on("tasks", (data) => {
  // 		setTasks(data);
  // 	});
  // }, [socket]);

  const handleDragEnd = (objValue) => {
    const { destination, source } =objValue;
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;
      
      dispatch(Actions.updateTaskStatus( {
        id: objValue.draggableId,
        status:objValue.destination.droppableId
      }));
      
      dispatch(Actions.getTask());

    socket.emit("taskDragged", {
      source,
      destination,
    });
  };
  return (
    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {tasks &&
          Object.entries(tasks).map((task) => (
            <div
              className={`${task[1].title.toLowerCase()}__wrapper`}
              key={task[1].title}
            > 
              <Badge>{task[1].title} Tasks </Badge>
              <div className={`${task[1].title.toLowerCase()}__container`}>
                <Droppable droppableId={task[1].title} key={task[1].title} >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {task[1].items.map((item, index) => (
                        <Draggable 
                          key={item.id}
                          draggableId={item.id}
                          task={item}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`${task[1].title.toLowerCase()}__items`}
                            >
                              <p>{item.title}</p>
                              <p className="comment">
                                <Link
                                  to={`/comments/${task[1].title}/${item.id}`}
                                >
                                  {item.comments.length > 0
                                    ? `View Comments`
                                    : "Add Comment"}
                                </Link>
                              </p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
      </DragDropContext>
    </div>
  );
};

export default TasksContainer;
