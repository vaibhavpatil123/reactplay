import * as ActionTypes from "../actions/types";

import { all, put, takeEvery, call } from "redux-saga/effects";

import * as TaskService from "../services/taskService";
import * as TaskAction from "../actions/taskActions";

function* loadTask() {
  const data = yield TaskService.loadTask();
  yield put(TaskAction.getTaskSuccess(data));
}

export function* watchLoadTask() {
  yield takeEvery(ActionTypes.GET_TASK_START, loadTask);
}

function* addTask(action) {
  const data = yield TaskService.addTask(action.task);
  yield put(TaskAction.addTaskSuccess(data));
}

function* updateTaskStatus(action) {
  const data = yield TaskService.updateTaskStatus(action.task);
  yield loadTask()
}

export function* watchAddTask() {
  yield takeEvery(ActionTypes.ADD_TASK_START, addTask);
}
export function* watchUpdateTaskStatus() {
  yield takeEvery(ActionTypes.UPDATE_TASK_STATUS_START, updateTaskStatus);
}