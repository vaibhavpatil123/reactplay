import * as ActionTypes from "../actions/types";
import * as TodoActions from "../actions/todoActions";
import { all, put, takeEvery, call } from "redux-saga/effects";
import * as restService from "../restService";

import { watchAddTask, watchLoadTask,watchUpdateTaskStatus } from "./taskSaga";

function* getUsers() {
  const data = yield call(restService.getTodos);
  console.log("saga getuesrs", data);
  yield put(TodoActions.getTodosSuccess(data));
}

export function* watchGetTodos() {
  yield takeEvery(ActionTypes.GET_TODO_START, getUsers);
}

export default function* rootSaga() {
  yield all([watchGetTodos(), watchAddTask(), watchLoadTask(),watchUpdateTaskStatus()]);
}
