import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');
import { StriveRecordTable_Fn } from '../../striveRecordTable/striveRecordTable_function';


export const MonthSelection_Fn = {
    monthAry: [' ',1,2,3,4,5,6,7,8,9,10,11,12,' '],
    yearAry: [' ',2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,
                    2021,2022,2023,2024,2025,2026,2027,2028,2029,2030,
                    2031,2032,2033,2034,2035,2036,2037,2038,2039,2040,
                    2041,2042,2043,2044,2045,2046,2047,2048,2049,2050,' '],
    defaultSelect:function(This){
        setTimeout(()=>{
            //set default value to month scroll view
            const { striveRecord:{ selectedMonth },selectedDate:{ selectedDay }, selectMonth } = This.props;
            const yearHeight = This.yearScrollHeight;
            const monthHeight = This.monthScrollHeight;
            const yearAry = this.yearAry;
            const monthAry = this.monthAry;
            const monthIndex = selectedMonth?
                                monthAry.indexOf(selectedMonth.month):
                                monthAry.indexOf(selectedDay.month);
            const yearIndex = selectedMonth?
                                yearAry.indexOf(selectedMonth.year):
                                yearAry.indexOf(selectedDay.year);
            This.monthCtrl.scrollTo({ y: (monthIndex*(monthHeight/monthAry.length))-((monthHeight/monthAry.length)/2) });
            This.yearCtrl.scrollTo({ y: (yearIndex*(yearHeight/yearAry.length))-((yearHeight/yearAry.length)/2) });
        },100)
    },
    comfirmSelect:function(This){
        const { selectedDate:{ selectedDay }, selectMonth } = This.props;
        const yearScrollHeight = This.yearScrollHeight;
        const monthScrollHeight = This.monthScrollHeight;
        const yearAry = this.yearAry;
        const monthAry = this.monthAry;
        const yearNowPos = This.yearOffset;
        const monthNowPos = This.monthOffset;
        let selectedYearIndex = -1;
        let selectedMonthIndex = -1;
        let selectedYear = selectedDay.year;
        let selectedMonth = selectedDay.month;

        if(yearNowPos){//set year based on selected pos
            let indexFloat = (yearNowPos+((yearScrollHeight/yearAry.length)/2))/(yearScrollHeight/yearAry.length);
            selectedYearIndex = Math.round(indexFloat);
            selectedYear = yearAry[selectedYearIndex];
        }
        if(monthNowPos){//set month based on selected pos
            let indexFloat = (monthNowPos+((monthScrollHeight/monthAry.length)/2))/(monthScrollHeight/monthAry.length);
            selectedMonthIndex = Math.round(indexFloat);
            selectedMonth = monthAry[selectedMonthIndex];
        }
        selectMonth({year:selectedYear, month:selectedMonth});
        selected= {year:selectedYear, month:selectedMonth};
        StriveRecordTable_Fn.monthRecordView.setDate(This.props, selected);
        
    }
};
