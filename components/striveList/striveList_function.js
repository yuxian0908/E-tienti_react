import React from 'react';
import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export const StriveList_Fn = {
    getData:(props)=>{
        const { striveCard: { List, selectedList }, selectedDate: { selectedDay }, selectStriveElem} = props;
        let Ary = selectedList?selectedList:List;
        // copy the origin Ary in order to not pollute origin
        let DbAry = JSON.parse(JSON.stringify(Ary));
        initDb = ()=>{
            props.enterStriveCard();
            return new Promise(function(resolve, reject) {
                resolve(1)
            })
        };

        initDb().then(()=>{
            let selectedSenAry = '';
            db.transaction(sql => {
                //find data from db
                let seletedDateStr = selectedDay.dateString;
                console.log(seletedDateStr);
                sql.executeSql('SELECT * FROM striveCard WHERE date ="'+seletedDateStr+'" ;', [], (_, { rows }) =>{
                    if(rows.item(0)){
                        selectedSenAry = rows.item(0).content.split(',');
                        console.log(selectedSenAry);
                        for(let i=0;i<DbAry.length;i++){
                            if(selectedSenAry.indexOf(DbAry[i].title)!==-1){
                                DbAry[i].isChecked = true;
                            }
                            if(i==DbAry.length-1){
                                console.log("entered")
                            }
                        }
                    }
                });
            }) 
        })
        .then(()=>{
            setTimeout(()=>{
                props.getStriveCardFrDb(DbAry);
            },10)
        })
    },
    resetData:(props)=>{
        const { striveCard: { List, selectedList }, selectStriveElem} = props;
        props.resetStriveElem('cancel');
    },
    getRenderList:(props)=>{
        let { striveCard: { List, selectedList }, selectStriveElem} = props;
        let ListAry = selectedList?selectedList:List;
        // copy the origin Ary in order to not pollute origin
        return JSON.parse(JSON.stringify(ListAry));
    }
};
