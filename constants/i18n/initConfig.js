import { CHENESE } from './ch';
import I18n from 'ex-react-native-i18n';

export const i18nCONFIG = () =>{
    I18n.locale = "ch";
    const { ch } = CHENESE;
    I18n.translations = {
      'ch': ch
    }
} 