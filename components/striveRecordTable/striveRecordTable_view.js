import React from 'react';
import { View,Modal, TextInput, TouchableOpacity, 
        CameraRoll, Alert, ToastAndroid, Image  } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { takeSnapshotAsync } from 'expo';
import { SQLite } from 'expo';

import { selectMonth,getStriveRecord } from '../../redux/actions';
import { StriveRecordTable_Fn } from './striveRecordTable_function';
import I18n from 'ex-react-native-i18n';
import { i18nCONFIG } from '../../constants/i18n';
import { BUTTON_GROUP_STYLES, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants/Layout';

const db = SQLite.openDatabase('db.db');

class StriveRecordTable extends React.Component {
    
    state = {
        modalVisible: false,
        exportImg: '',
        name:'',
        DowName:'',
        belongedTemple:'',
        email:''
    };

    setModalVisible = (visible,Img=null)=> {
        // console.log(this);
        this.setState({exportImg: Img});
        this.setState({modalVisible: visible});
    }

    componentWillMount(){
        const monthRecordView = StriveRecordTable_Fn.monthRecordView;
        monthRecordView.setDate(this.props);
    }

    componentWillUpdate(){
        db.transaction(sql => {
            sql.executeSql('SELECT * FROM setting', [], (_, { rows }) =>{
                let data =  rows.item(0);
                if(data){
                    console.log(rows.item(0));
                    if(data.name!==this.state.name||
                        data.DowName!==this.state.DowName||
                        data.belongedTemple!==this.state.belongedTemple||
                        data.email!==this.state.email){
                            this.setState({
                                name: data.name,
                                DowName: data.DowName,
                                belongedTemple: data.belongedTemple,
                                email: data.email
                            });
                    }
                }
            });
        });
    }

    render() {
        const monthRecordView = StriveRecordTable_Fn.monthRecordView;
        const { striveRecord:{ InitDateEvent,RecordDateEvent,selectedMonth },
                    selectedDate:{ selectedDay }, selectMonth } = this.props;
        const renderEvent = RecordDateEvent?RecordDateEvent:InitDateEvent;
        const renderTitleMonth = selectedMonth?selectedMonth.year+'年'+selectedMonth.month+'月':null;

        return (
            <View>
                <View>
                    <Button 
                        buttonStyle={styles.exportBtn}
                        title={I18n.t('striveRecord.exportImg')} 
                        onPress={this._viewToImg} />
                    <TouchableOpacity
                        style={styles.refreshBtn}
                        onPress={() => {
                            monthRecordView.setDate(this.props,selectedMonth);
                        }}>
                        <Text>{I18n.t('striveRecord.refresh')}</Text>
                        <View>
                            <Icon 
                                name = 'refresh' type = 'EvilIcons' color = 'black' 
                                style = {BUTTON_GROUP_STYLES.backIconStyle}/>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(false);
                        }}>
                        <View style={styles.modalContainer}>
                            <Image
                                style={styles.exportImg}
                                source={{uri: this.state.exportImg}}
                            />                   
                            <View style={styles.savingBtn}>
                                <Button 
                                buttonStyle={{
                                    width:SCREEN_WIDTH*0.25,
                                }}
                                title={I18n.t('striveRecord.saveImg')}
                                onPress={this._saveToCameraRollAsync}/>                                       
                            </View>
                            
                            <View style={styles.sendingBtn}>
                            <Button 
                                buttonStyle={{
                                    width:SCREEN_WIDTH*0.25,
                                }}
                                title={I18n.t('striveRecord.sendEmail')}
                                onPress={()=>{
                                    StriveRecordTable_Fn.sendEmail(this.state)
                                }}/>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View
                    collapsable={false}
                    ref={(view) => {
                        this._container = view;
                    }}>
                    <View style={styles.seletedMon}>
                        <View style={styles.titleInfo}>
                            <View>
                                <Text style={{fontSize:25}}>
                                    {I18n.t('striveRecord.recordTitle.first')+renderTitleMonth+
                                    I18n.t('striveRecord.recordTitle.second')}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.userInfo.container}>
                            <View style={{flex:0.33, flexDirection:'row'}}>
                                <Text style={{flex:0.3,padding:0}}>{I18n.t('striveRecord.name')}</Text>
                                <TextInput
                                style={styles.userInfo.input}
                                placeholder={I18n.t('striveRecord.placeholder.name')}
                                value={this.state.name}
                                />
                            </View>
                            <View style={{flex:0.33, flexDirection:'row'}}>
                                <Text style={{flex:0.3,padding:0}}>{I18n.t('striveRecord.DowName')}</Text>
                                <TextInput
                                style={styles.userInfo.input}
                                placeholder={I18n.t('striveRecord.placeholder.DowName')}
                                value={this.state.DowName}
                                />
                            </View>
                            <View style={{flex:0.33, flexDirection:'row'}}>
                                <Text style={{flex:0.3,padding:0}}>{I18n.t('striveRecord.belongedTemple')}</Text>
                                <TextInput
                                style={styles.userInfo.input}
                                placeholder={I18n.t('striveRecord.placeholder.belongedTemple')}
                                value={this.state.belongedTemple}
                                />
                            </View>
                        </View>
                        {monthRecordView.fullweeks(monthRecordView.fullweeksnum).fill(1).map((nouse1, week) => {
                        return (
                            <View key={week} style={styles.weekView}>
                            {monthRecordView.weekdays(monthRecordView.weekdaysnum).fill(1).map((nouse2, weekday) => {
                                return (
                                <View key={((week) * 7) + (weekday + 1)} style={styles.weekdayView}>
                                    <View key={'title' + (((week) * 7) + (weekday + 1))} style={styles.weekdayTitle}>
                                        <Text key={'titleText' + (((week) * 7) + (weekday + 1))}>{((week) * 7) + (weekday + 1)}</Text>
                                    </View>
                                    <View key={'content' + (((week) * 7) + (weekday + 1))}>
                                        <Text key={'contentText' + (((week) * 7) + (weekday + 1))}>{renderEvent[(((week) * 7) + (weekday + 1))]}</Text>
                                    </View>
                                </View>
                                );
                            })}
                            </View>
                        );
                        })}

                        {monthRecordView.remaindWeek(monthRecordView.remaindWeeknum).fill(1).map((nouse1, week) => {
                        return (
                            <View key={week} style={styles.weekView}>
                            {monthRecordView.remaindWeekdays(monthRecordView.remaindWeekdaysnum).fill(1).map((nouse2, remaindWeekdays) => {
                                return (
                                <View key={remaindWeekdays+29} style={styles.weekdayView}>
                                    <View key={'title' + (remaindWeekdays+29)} style={styles.weekdayTitle}>
                                        <Text key={'titleText' + (remaindWeekdays+29)}>{remaindWeekdays+29}</Text>
                                    </View>
                                    <View key={'content' + (remaindWeekdays+29)}>
                                        <Text key={'contentText' + (remaindWeekdays+29)}>{renderEvent[remaindWeekdays+29]}</Text>
                                    </View>
                                </View>
                                );
                            })}
                            {monthRecordView.remaindDays(monthRecordView.remaindDaysnum).fill(1).map((nouse2, remaindDays) => {
                                return (
                                <View key={'remaindDays'+remaindDays} style={styles.weekdayView}>
                                    <View key={'title-' + ('remaindDays'+remaindDays)} style={styles.weekdayTitle}>
                                        <Text key={'titleText-' + ('remaindDays'+remaindDays)}></Text>
                                    </View>
                                    <View key={'content-' + ('remaindDays'+remaindDays)}>
                                        <Text key={'contentText=' + ('remaindDays'+remaindDays)}></Text>
                                    </View>
                                </View>
                                );
                            })}
                            </View>
                        );
                        })}

                    </View>
                </View>
            </View>
        );
    }
    _saveToCameraRollAsync = async () => {
        const { Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let saveResult = await CameraRoll.saveToCameraRoll(this.savingItem, 'photo');

            ToastAndroid.show(I18n.t('saved'),ToastAndroid.SHORT)
            this.setModalVisible(false);
        } else {
          throw new Error('camera permission not granted');
        }
    };
    _viewToImg = async () => {
        const { Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            console.log('saveResult');
            this.savingItem = await takeSnapshotAsync(this._container, {
              format: 'jpeg',
              result: 'file',
            });
            
            this.setModalVisible(true,this.savingItem);
        } else {
          throw new Error('camera permission not granted');
        }
    };
}


const styles = {
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
    weekView:{ 
      width: '98%',
      flex: 1, 
      flexDirection: 'row', 
      flexWrap: 'wrap',
    },
    weekdayView:{
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth:1,
      width: '14.2%',
      height:105,
      backgroundColor: 'yellow'
    },
    weekdayTitle:{
      height:30,
      borderStyle: 'solid',
      borderBottomColor: 'black',
      borderBottomWidth:1,
    },
    seletedMon:{
        padding:5,
        backgroundColor:'white',
        paddingBottom:15
    },
    userInfo:{
        container:{
            width: '97.5%',
            flex:1, 
            flexDirection:'row',
            backgroundColor: 'yellow',
            borderColor: 'black',
            borderWidth: 1
        },
        input:{
            height: 35,
            width:100, 
            flex:0.65,
            padding:5
        }
    },
    titleInfo:{
        width: '97.5%',
        backgroundColor: 'yellow',
        borderColor: 'black',
        borderWidth: 1,
        height: 35,
        alignItems: 'center'
    },
    exportBtn:{
        width:SCREEN_WIDTH*0.25,
        position:'absolute',
        right:SCREEN_WIDTH*0.05,
        top:-50
    },
    refreshBtn:{
        position:'absolute',
        right:SCREEN_WIDTH*0.45,
        top:-50,
    },
    modalContainer:{
        left: SCREEN_WIDTH*0.1,
        top: SCREEN_HEIGHT*0.05,
        backgroundColor:'white',
        height: SCREEN_HEIGHT*0.85,
        width: SCREEN_WIDTH*0.8, 
        position: 'absolute',
        elevation: 100
    },
    exportImg:{ 
        position: 'absolute',
        left: SCREEN_WIDTH*0.025,
        top: SCREEN_HEIGHT*0.025,
        width: SCREEN_WIDTH*0.75, 
        height: SCREEN_HEIGHT*0.75,
    },
    savingBtn:{
        position: 'absolute',
        bottom: 3,
        left:10
    },
    sendingBtn:{
        position: 'absolute',
        bottom: 3,
        right:10
    }
};
  
const mapStateToProps = ({ striveCard, selectedDate, striveRecord }) => ({ striveCard, selectedDate, striveRecord });

export const StriveRecordTableCpn = connect(mapStateToProps, { selectMonth, getStriveRecord })(StriveRecordTable);