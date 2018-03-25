import {
    SELECT_DATE
} from '../../actions/types.js';

const today = new Date();

const INITIAL_STATE = {
    selectedDay: {
        dateString: (today.getFullYear()+'-'+("0" + (today.getMonth() + 1)).slice(-2)+'-'+("0" + today.getDate()).slice(-2)).substring(0, 10),
        day: today.getDate(),
        month: today.getMonth() + 1,
        timestamp: Math.round(today),
        year: today.getFullYear(),
        
    },
};

export const selectedDate = (state = INITIAL_STATE, action) => {
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
  