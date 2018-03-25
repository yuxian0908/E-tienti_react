import {
    GET_STRIVE_RECORD
} from '../../actions/types.js';

const today = new Date();

const INITIAL_STATE = {
    InitDateEvent:Array(28),
};

export const striveRecord = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_STRIVE_RECORD: {  
        return {
          ...state,
          RecordDateEvent: action.payload,
        };
      }
      default:
        return state;
    }
};
  