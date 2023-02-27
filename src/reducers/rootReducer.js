import { combineReducers } from "redux";
import todolistReducer from "./todolistReducer";
import websqlReducer from './websqlReducers';

const rootReducer = combineReducers({
    todolistReducer,
    websqlReducer
});

export default rootReducer;