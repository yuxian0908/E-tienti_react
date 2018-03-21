import React from 'react';
import Expo, { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

export const TEST_DB = {
  //test tables
    testShowTables : ()=>{
        console.log('testShowTables')
        db.transaction(sql => {
            sql.executeSql('SELECT name FROM sqlite_master WHERE type="table"', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        })
    },  
    testFindall : ()=>{
        db.transaction(sql => {
            sql.executeSql('SELECT * FROM striveCard', [], (_, { rows }) =>{
                let data = JSON.stringify(rows);
                console.log(data)
                console.log(data.array)
                console.log(data.length)
                console.log(rows.item(0))
                console.log(rows.array)
                console.log(rows.length)
                }
            );
        })
    },  
    testDropTable : ()=>{
        db.transaction(sql => {
            sql.executeSql('DROP TABLE praiseCard;', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        })
    },
    testInsert : ()=>{
        console.log('testInsert')
        db.transaction(sql => {
            sql.executeSql('INSERT OR REPLACE INTO striveCard (content) values ("00000000")', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        })
    }
};