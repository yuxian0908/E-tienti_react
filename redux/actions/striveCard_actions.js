import {
    SELECT_STRIVE_ELEM,
    RESET_STRIVE_ELEM,
    ALL_STRIVE_ELEM,
    SAVE_STRIVE_ELEM,
    ENTER_STRIVE_CARD,
    GET_STRIVE_CARD_FR_DB
} from './types.js';

export const selectStriveElem = payload => ({ type: SELECT_STRIVE_ELEM, payload });
export const resetStriveElem = payload => ({ type: RESET_STRIVE_ELEM, payload });
export const allStriveElem = payload => ({ type: ALL_STRIVE_ELEM, payload });
export const saveStriveElem = payload => ({ type: SAVE_STRIVE_ELEM, payload });
export const enterStriveCard = payload => ({ type: ENTER_STRIVE_CARD, payload });
export const getStriveCardFrDb = payload => ({ type: GET_STRIVE_CARD_FR_DB, payload });
