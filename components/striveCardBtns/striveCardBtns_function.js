import React from 'react';
import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export const striveCardBtns_Fn = {
    getSavingObj:(props)=>{
        const { striveCard: { List, selectedList }, selectStriveElem} = props;
        let ListAry = selectedList?selectedList:List;
        // copy the origin Ary in order to not pollute origin
        let renderList = JSON.parse(JSON.stringify(ListAry));
        return renderList;
    },
    saveStriveCard:(props,saveContent)=>{
        const { striveCard: { List, selectedList }, selectedDate: { selectedDay }, selectStriveElem} = props;
        let savingContent = saveContent;
        let savingDate = selectedDay;
        let savedAry = [];
        getSavingAry = ()=>{
            return new Promise(function(resolve, reject) {
                resolve(1)
            })
        };

        getSavingAry().then(()=>{
            for(let i=0;i<savingContent.length;i++){
                if(savingContent[i].isChecked===true){
                    savedAry.push(savingContent[i].title)
                }
            }
            console.log(savedAry.join());
            db.transaction(sql => {
                sql.executeSql('INSERT OR REPLACE INTO striveCard (content,date) values ("'+
                                savedAry.join()+'","'+savingDate.dateString+'");', [], (_, { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            })
        })
        .then(()=>{
            props.saveStriveElem(saveContent);
        })
    }
};
