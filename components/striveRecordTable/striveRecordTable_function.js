import React from 'react';
import Expo, { SQLite } from 'expo';
import Picker from 'react-native-picker';

const db = SQLite.openDatabase('db.db');

export const StriveRecordTable_Fn = {
    monthRecordView : {
        setDate:function(props){//direct the month table to selected month and get its data from db 
          
          const { striveCard: { List, selectedList }, selectedDate: { selectedDay }, getStriveRecord} = props;
          let day = new Date(selectedDay.dateString);
          let test = this.dateEvent
          
          setConfig = ()=>{
            this.selectedMonth = (day.getFullYear()+'-'+("0" + (day.getMonth() + 1)).slice(-2)+
                                          '-'+("0" + day.getDate()).slice(-2)).substring(0, 7);
            this.selectedMonthDate = new Date(Number(day.getFullYear()),Number(day.getMonth()+1),0);
            this.fullweeksnum = Math.floor(this.selectedMonthDate.getDate()/7);
            this.remaindWeeknum = this.selectedMonthDate.getDate()>28?1:0;
            this.remaindWeekdaysnum = this.selectedMonthDate.getDate()%7;
            this.remaindDaysnum = 7-this.selectedMonthDate.getDate()%7;
            return new Promise(function(resolve, reject) {
                resolve(1)
            })
          };
          setConfig().then(()=>{
            //get data from db and convert it to numbers defined in striveCard
            db.transaction(sql => {
              sql.executeSql("SELECT * FROM striveCard WHERE date LIKE '"+this.selectedMonth+"%' ;", [], (_, { rows }) =>{
                let data = rows;
                let striveSentences = List;
                let event = new Array(this.selectedMonthDate.getDate());
                for(let i=0;i<data.length;i++){
                  let date = Number(data.item(i).date.substring(8, 10));
                  let contentArray = data.item(i).content.split(',');
                  let contentCodeArray = new Array;
                  console.log(contentArray);
                  for(let j=0;j<striveSentences.length;j++){
                    if(contentArray.indexOf(striveSentences[j].title)!==-1){
                      contentCodeArray.push(j+1);
                    }
                  }
                  event[date] = contentCodeArray.join(',');
                }
                this.dateEvent = event;
                props.getStriveRecord(this.dateEvent);
                //set export Record title month
                let month = this.selectedMonth;
              });
            }) 
          })         
        },
        getMonth:function(month){//get month from user selection
          this.selectedMonthDate = new Date(Number(month.substring(0, 4)),Number(month.substring(5, 7)),0);
          this.setDate(this.selectedMonthDate);
        },
        selectedMonth: '',
        selectedMonthDate: new Date(),
        // fullweeksnum : [1,2,3,4],
        // weekdaysnum :[1,2,3,4,5,6,7],
        fullweeks : Array,
        fullweeksnum : 4,
        weekdays : Array,
        weekdaysnum : 7,
        remaindWeek : Array,
        remaindWeeknum : 0,
        remaindWeekdays : Array,
        remaindWeekdaysnum : 0,
        remaindDays : Array,
        remaindDaysnum : 0,
        dateEvent:Array(28)
    },
    test:()=>{
      console.log(Picker)
      let data = [];
      for(var i=0;i<100;i++){
          data.push(i);
      }
      Picker.init({
          pickerData: data,
          selectedValue: [59],
          onPickerConfirm: data => {
              console.log(data);
          },
          onPickerCancel: data => {
              console.log(data);
          },
          onPickerSelect: data => {
              console.log(data);
          }
      });
      Picker.show();
    }
};
