import { combineReducers } from "redux";
import taskReducer from "../reducers/taskReducer";
const rootReducer = combineReducers({  taskReducer });
export default rootReducer;
