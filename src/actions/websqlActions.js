import * as types from "../constants/websqlConstants";
import * as syncTypes from '../constants/syncConstants';
import { addTodo, getTodolist, getTodolistSuccess } from "./todolistActions";
import { v4 as uuid } from 'uuid';
import { syncOff, syncOn } from "./syncActions";

let dbName = 'todolistAppDB';
let dbDesc = 'Todolist database';
let dbVersion = '1.0';
let size = 5 * 1024 * 1024; // 5 mega bytes
let db;
let offlineItem = 0;

export function openDB() {
    return (dispatch, getState) => {
        db = window.openDatabase(dbName, dbVersion, dbDesc, size, () => {
            console.log('database created successfully');
            dispatch({ type: types.CREATE_DB_SUCCESS });
        });

        db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS http_response(url TEXT NOT NULL PRIMARY KEY, res TEXT)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS sync(id TEXT PRIMARY KEY, url TEXT NOT NULL, method TEXT, body TEXT)');
            },
            err => {
                console.error('Error creating database tables', err);
                dispatch({ type: types.CREATE_TABLES_ERROR, err: err.message });
            },
            () => {
                console.log('database tables created successfully');
                dispatch({ type: types.CREATE_TABLES_SUCCESS });
        });
    }
}

export function storeToDB(url, todolist) {
    return (dispatch, getState) => {
        db.transaction(tx => {
            tx.executeSql('REPLACE INTO http_response(url, res) VALUES(?, ?)', [url, JSON.stringify(todolist)]);
        },
        err => {
            console.error('Error inserting data into the database tables', err);
            dispatch({ type: types.INSERT_DATA_ERROR, err: err.message });
        },
        () => {
            console.log('Data inserted successfully');
            dispatch({ type: types.INSERT_DATA_SUCCESS });
        })
    }
}

export function getFromDB() {
    return (dispatch, getState) => {
        let todolist = [];
        // get data from http_response table
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM http_response', [], (tx, result) => {
                if(result && result.rows[0] && result.rows[0].res) {
                    todolist = JSON.parse(result.rows[0].res);
                }
            });
        },
        err => {
            console.error('Error fetching the data from database from http_response table', err);
            dispatch({ type: types.GET_FROM_DB_ERROR, err: err.message });
        },
        () => {
            console.log('Data Fetched successfully from database from http_response table');
            dispatch({ type: types.GET_FROM_DB_SUCCESS });
        });

        // get data from sync table
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM sync', [], (tx, result) => {
                for(let i = 0; i < result.rows.length; i++) {
                    const todo = { todo: JSON.parse(result.rows[i].body), firebaseID: ++offlineItem };
                    todolist.push(todo);
                }
            })
        }, 
        err => {
            console.error('Error fetching the data from database from sync table', err);
            dispatch({ type: types.GET_FROM_DB_ERROR, err: err.message });
        },
        () => {
            console.log('Data Fetched successfully from database from sync table');
            dispatch({ type: types.GET_FROM_DB_SUCCESS });
            dispatch(getTodolistSuccess(todolist));
        })
    }
}

export function addToSync(url, method, body, callback) {
    return (dispatch, getState) => {
        db.transaction(tx => {
            tx.executeSql('REPLACE INTO sync(id, url, method, body) VALUES(?,?,?,?)', [uuid(), url, method, JSON.stringify(body)]);
        },
        err => {
            console.error('Error adding data to sync table', err);
            dispatch({ type: syncTypes.ADD_TO_SYNC_ERROR, err: err.message });
        },
        () => {
            console.log('Added to sync table successfully');
            dispatch({ type: syncTypes.ADD_TO_SYNC_SUCCESS });
            if(callback) callback();
            localStorage.setItem('syncRequired', 'true');
        })
    }
}

export function deleteFromSync(id) {
    return (dispatch, getState) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM sync WHERE id = ?', [id]);
        },
        err => {
            console.error('Error deleting from sync table', err);
            dispatch({ type: types.DELETE_DATA_ERROR, err: err.message });
        },
        () => {
            console.log('Deleted from sync table successfully');
            dispatch({ type: types.DELETE_DATA_SUCCESS });
        });
    }
}

export function syncData() {
    return (dispatch, getState) => {
        if(!window.navigator.onLine) {
            return;
        } else {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM sync', [], (tx, result) => {
                    if(result.rows.length === 0) {
                        return;
                    } else {
                        dispatch(syncOn());
                        for(let i = 0; i < result.rows.length; i++) {
                            let syncItem = result.rows[i];
                            let id = syncItem.id;
                            let todo = JSON.parse(syncItem.body);
                            dispatch(addTodo(todo, () => {
                                dispatch(getTodolist());
                                dispatch(deleteFromSync(id));
                            }));
                        }
                    }
                })
            },
            err => {
                console.error('Error syncing data', err);
                dispatch({ type: syncTypes.SYNC_ERROR, err: err.message });
            },
            () => {
                console.log('SYNC WAS SUCCESSFUL');
                dispatch({ type: syncTypes.SYNC_SUCCESS });
                setTimeout(() => {
                    dispatch(syncOff())
                }, 5000);
            });
        }
    }
}