import { combineReducers } from 'redux';
import { selectedDate } from './calendar_reducers';
import { striveCard } from './striveCard_reducers';
import { striveRecord } from './striveRecord_reducers';

export default combineReducers({
    selectedDate,
    striveCard,
    striveRecord
})