import {
    GET_STRIVE_RECORD,
    SELECT_MONTH
} from './types.js';

export const getStriveRecord = payload => ({ type: GET_STRIVE_RECORD, payload });
export const selectMonth = payload => ({ type: SELECT_MONTH, payload });
