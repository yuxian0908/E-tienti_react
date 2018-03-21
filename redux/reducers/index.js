import { combineReducers } from 'redux';
import keys from './keys_reducer';
import selectedValues from './selections_reducer';
import selectedDate from './calendar_reducer';

export default combineReducers({
    keys,selectedValues,selectedDate
})