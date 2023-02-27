import * as types from '../constants/websqlConstants';

const initialState = {
    dbCreated: false,
    tablesCreated: false,
    dataInserted: false
}

export default function websqlReducer(state = initialState, action) {
    const data = action.res;
    const err = action.err;
    switch(action.type) {
        case types.CREATE_DB_SUCCESS:
            return { ...state, dbCreated: true };
        case types.CREATE_DB_ERROR:
            return { ...state, dbCreated: false, dbCreationError: err };
        case types.CREATE_TABLES_SUCCESS:
            return { ...state, tablesCreated: true };
        case types.CREATE_DB_ERROR:
            return { ...state, tablesCreated: false, tableCreationError: err };
        case types.INSERT_DATA_SUCCESS: 
            return { ...state, dataInserted: true };
        case types.INSERT_DATA_ERROR: 
            return { ...state, dataInserted: false, dataInsertionError: err}
        case types.STORE_TO_DB_SUCCESS:
        case types.GET_FROM_DB_SUCCESS:
        default: 
            return state;
    }
}