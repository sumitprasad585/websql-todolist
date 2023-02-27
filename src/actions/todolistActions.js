import request from 'superagent';
import * as types from '../constants/todolistConstants';
import { addToSync, getFromDB, storeToDB } from './websqlActions';

export function getTodolistSuccess(res) {
    return { type: types.GET_TODOS_SUCCESS, res };
}

export function getTodolistError(err) {
    return { type: types.GET_TODOS_ERROR, err };
}

export function getTodolist() {
    return (dispatch, getState) => {
        const url = 'https://todolist-websql-default-rtdb.firebaseio.com/todos.json';
        if(window.navigator.onLine) {
            request
            .get(url)
            .set({ 'Content-Type': 'application/json' })
            .end((err, res) => {
                if(err) {
                    return dispatch(getTodolistError(err));
                }
                const resData = JSON.parse(res.text);
                const todolist = [];
                for(let key in resData) {
                    todolist.push({ todo: resData[key], firebaseID: key });
                }
                dispatch(getTodolistSuccess(todolist));
                dispatch(storeToDB(url, todolist));
            });
        } else { 
            dispatch(getFromDB());
        }
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
        const url = 'https://todolist-websql-default-rtdb.firebaseio.com/todos.json';
        if(window.navigator.onLine) {
            request
            .post(url)
            .send(todo)
            .end((err, res) => {
                if(err) {
                    return dispatch(addTodoError(err));
                }
                if(success) success();
                dispatch(addTodoSuccess());
            })
        } else {
            dispatch(addTodoSuccess());
            dispatch(addToSync(url, 'POST', todo, () => {
                if(success) success();
            }));
        }
    }
}

export function deleteTodoSuccess() {
    return { type: types.DELETE_TODO_SUCCESS };
}

export function deleteTodoError(err) {
    return { type: types.DELETE_TODO_ERROR, err };
}

export function deleteTodo(firebaseID, success) {
    return (dispatch, getState) => {
        if(window.navigator.onLine) {
            request 
            .delete(`https://todolist-websql-default-rtdb.firebaseio.com/todos/${firebaseID}.json`)
            .end((err, res) => {
                if(err) {
                    return dispatch(deleteTodo());
                }
                if(success) success();
                dispatch(deleteTodoSuccess());
            })
        } else {
            alert('You are offline! Please connect to internet and sync the data and then try to delete');
            return dispatch({ type: 'DELETE_TODO_OFFLINE_ERROR' });
        }
    }
}