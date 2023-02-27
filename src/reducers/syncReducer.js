import * as types from '../constants/syncConstants';

const initialState = {
    addToSyncError: false,
    syncOn: false
}

export default function syncReducer(state = initialState, action) {
    // const data = action.res;
    const err = action.err; 
    switch(action.type) {
        case types.ADD_TO_SYNC_ERROR:
            return {
                ...state, addToSyncError: true, err
            }
        case types.SYNC_ON:
            return {
                ...state, syncOn: true
            }
        case types.SYNC_OFF:
            return {
                ...state, syncOn: false
            }
        default: 
            return state;
    }
}