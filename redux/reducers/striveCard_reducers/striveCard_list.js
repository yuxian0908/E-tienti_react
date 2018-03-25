import I18n from 'ex-react-native-i18n';
import { i18nCONFIG } from '../../../constants/i18n';
import { 
    SELECT_STRIVE_ELEM,
    RESET_STRIVE_ELEM,
    ALL_STRIVE_ELEM,
    SAVE_STRIVE_ELEM,
    ENTER_STRIVE_CARD,
    GET_STRIVE_CARD_FR_DB
} from '../../actions/types.js';
import Expo, { SQLite } from 'expo';


const db = SQLite.openDatabase('db.db');
i18nCONFIG();

const INITIAL_STATE =()=> {//get striveList from i18n
    const striveListLength = Number(I18n.t('striveCard.list.totalNum'))
    let striveList = [];
    for(let i=1;i<=striveListLength;i++){
        let elem = {
            title : I18n.t('striveCard.list.'+i),
            isChecked : false
        }
        striveList.push(elem);
    }
    return{
        List: striveList
    }
}
const init = INITIAL_STATE();//set striveList to a immutable varible

export const striveCard = (state = init, action)=>{
    switch (action.type) {
        case ENTER_STRIVE_CARD: {
            return {
                ...state
            };
        }
        case GET_STRIVE_CARD_FR_DB: {
            return {
                ...state,
                selectedList: action.payload
            };
        }
        case SELECT_STRIVE_ELEM: {
            return {
                ...state,
                selectedList : action.payload
            };
        }
        case RESET_STRIVE_ELEM:{
            let initedList = JSON.parse(JSON.stringify(state));
            return {
                ...state,
                selectedList : initedList.List
            };
        }
        case ALL_STRIVE_ELEM:{
            let selectedList = JSON.parse(JSON.stringify(state));
            for(let i=0;i<selectedList.List.length;i++){
                selectedList.List[i].isChecked = true
            }
            return {
                ...state,
                selectedList : selectedList.List
            };
        }
        case SAVE_STRIVE_ELEM:{
            return {
                ...state,
                selectedList : action.payload
            };
        }
        default:{
            return state;
        }
    }
}