import request from 'superagent';
import * as types from '../constants/todolistConstants';

export function getTodolistSuccess(res) {
    return { type: types.GET_TODOS_SUCCESS, res };
}

export function getTodolistError(err) {
    return { type: types.GET_TODOS_ERROR, err };
}

export function getTodolist() {
    return (dispatch, getState) => {
        request
            .get('https://todolist-websql-default-rtdb.firebaseio.com/todos.json')
            .set({ 'Content-Type': 'application/json' })
            .end((err, res) => {
                if(err) {
                    return dispatch(getTodolistError(err));
                }
                const resData = JSON.parse(res.text);
                const todolist = [];
                for(let key in resData) {
                    todolist.push(resData[key]);
                }
                dispatch(getTodolistSuccess(todolist));
            });
    }
}

export function addTodoSuccess() {
    return { type: types.ADD_TODO_SUCCESS };
}

export function addTodoError(err) {
    return { type: types.ADD_TODO_ERROR, err };
}

export function addTodo(todo, success) {
    return (dispatch, getState) => {
        request
            .post('https://todolist-websql-default-rtdb.firebaseio.com/todos.json')
            .send(todo)
            .end((err, res) => {
                if(err) {
                    return dispatch(addTodoError(err));
                }
                if(success) success();
                dispatch(addTodoSuccess());
            })
    }
}