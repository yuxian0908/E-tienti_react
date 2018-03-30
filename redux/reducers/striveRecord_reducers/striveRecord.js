import {
    GET_STRIVE_RECORD,
    SELECT_MONTH
} from '../../actions/types.js';

const INITIAL_STATE = {
    InitDateEvent: Array(28),
};

export const striveRecord = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_STRIVE_RECORD: {  
        return {
          ...state,
          RecordDateEvent: action.payload,
        };
      }
      case SELECT_MONTH:{
          return {
            ...state,
            RecordDateEvent: action.payload,
            selectedMonth: action.payload,
          }
      }
      default:
        return state;
    }
};
  