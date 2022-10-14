import * as ActionTypes from "./types";

export const getTask = () => {
  return { type: ActionTypes.GET_TASK_START };
};

export const getTaskSuccess = (tasks) => {
  console.log("Taskuccess", tasks);
  return { type: ActionTypes.GET_TASK_SUCCESS, tasks: tasks };
};

export const getTaskError = (error) => {
  return { type: ActionTypes.GET_TASK_ERROR, error };
};

export const addTask = (task) => {
  return { type: ActionTypes.ADD_TASK_START, task: task };
};

export const addTaskSuccess = (task) => {
  console.log("Taskuccess", task);
  return { type: ActionTypes.ADD_TASK_SUCCESS, task: task };
};

export const addTaskError = (error) => {
  return { type: ActionTypes.ADD_TASK_ERROR, error };
};


export const updateTaskStatus = (task) => {
  return { type: ActionTypes.UPDATE_TASK_STATUS_START, task: task };
};

export const updateTaskSuccess = (task) => {
  console.log("updateTaskSuccess", task);
  return { type: ActionTypes.UPDATE_TASK_STATUS_SUCCESS, task: task };
};

export const updateTaskError = (error) => {
  return { type: ActionTypes.UPDATE_TASK_STATUS_ERROR, error };
};