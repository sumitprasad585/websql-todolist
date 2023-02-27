import * as types from '../constants/syncConstants';

const initialState = {
    addToSyncError: false
}

export default function syncReducer(state = initialState, action) {
    // const data = action.res;
    const err = action.err; 
    switch(action.type) {
        case types.ADD_TO_SYNC_ERROR:
            return {
                ...state, addToSyncError: true, err
            }
        default: 
            return state;
    }
}