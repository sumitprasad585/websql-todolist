import { combineReducers } from "redux";
import todolistReducer from "./todolistReducer";
import websqlReducer from './websqlReducers';
import syncReducer from './syncReducer';

const rootReducer = combineReducers({
    todolistReducer,
    websqlReducer,
    syncReducer
});

export default rootReducer;