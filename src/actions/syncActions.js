import * as types from '../constants/syncConstants';

export function syncOn() {
    return { type: types.SYNC_ON };
}

export function syncOff() {
    return { type: types.SYNC_OFF };
}