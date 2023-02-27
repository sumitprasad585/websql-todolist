import * as types from "../constants/websqlConstants";

let dbName = 'todolistDB';
let dbDesc = 'Todolist database';
let size = 5 * 1024 * 1024; // 5 mega bytes
let db;

export function openDB() {
    return (dispatch, getState) => {
        db = window.openDatabase(dbName, '', dbDesc, size, () => {
            console.log('database created successfully');
            dispatch({ type: types.CREATE_DB_SUCCESS });
        });

        db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS http_response(url TEXT NOT NULL PRIMARY KEY, res TEXT)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS sync(url TEXT NOT NULL PRIMARY KEY, res TEXT)');
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
            tx.executeSql('INSERT INTO http_response(url, res) VALUES(?, ?)', [url, JSON.stringify(todolist)]);
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
