import * as types from '../constants/todolistConstants';

const initialState = {
    todolist: []
}

export default function todolistReducer(state = initialState, action) {
    const data = action.res; 
    const err = action.err;
    switch(action.type) {
        case types.GET_TODOS_SUCCESS:
            return {
                ...state, todolist: data
            }
        case types.GET_TODOS_ERROR:
            return {
                ...state, err
            }
        case types.ADD_TODO_SUCCESS:
            return state;
        case types.ADD_TODO_ERROR: 
            return {
                ...state, err
            }
        default:
            return state;
    }
}