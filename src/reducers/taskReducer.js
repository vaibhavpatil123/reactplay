import * as ActionTypes from "../actions/types";

const initial = { tasks: [] };

const taskReducer = (state = initial, action) => {
  console.log("in Reducer", action);
  let updateTasks = [];
  switch (action.type) {
    case ActionTypes.ADD_TASK_SUCCESS:
      updateTasks = [...state.tasks, action.task];
      return { ...state, tasks: updateTasks };
    case ActionTypes.GET_TASK_SUCCESS:
      updateTasks = [...action.tasks];
      return { ...state, tasks: updateTasks };
    default:
      return state;
  }
};

export default taskReducer;
