import {
    SELECT_KEY_INDEX
} from '../actions/types.js';

const INITIAL_STATE = {
    selectedKeyIndex: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SELECT_KEY_INDEX: {  
        return {
          ...state,
          selectedKeyIndex: action.payload,
        };
      }
      default:
        return state;
    }
  };
  