import {
    SELECT_DATE
} from '../actions/types.js';

const INITIAL_STATE = {
    selectedDay: Date(),
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SELECT_DATE: {  
        return {
          ...state,
          selectedDay: action.payload,
        };
      }
      default:
        return state;
    }
};
  