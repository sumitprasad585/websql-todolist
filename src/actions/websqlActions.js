import * as types from "../constants/websqlConstants";

let dbName = 'todolistDB';
let dbDesc = 'Todolist database';
let size = 5 * 1024 * 1024; // 5 mega bytes

export function openDB() {
    return (dispatch, getState) => {
        const db = window.openDatabase(dbName, '', dbDesc, size, () => {
            console.log('database created successfully');
            dispatch({ type: types.CREATE_DB_SUCCESS });
        });

        db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS http_response(url TEXT NOT NULL PRIMARY KEY, res TEXT)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS sync(url TEXT NOT NULL PRIMARY KEY, res TEXT)');
            },
            err => {
                console.log('Error creating database tables', err);
                dispatch({ type: types.CREATE_TABLES_ERROR, err: err.message });
            },
            () => {
                console.log('database tables created successfully');
                dispatch({ type: types.CREATE_TABLES_SUCCESS });
        });
    }
}
