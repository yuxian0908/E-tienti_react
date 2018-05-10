import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import I18n from 'ex-react-native-i18n';
import { SQLite } from 'expo';

import { selectDate } from '../redux/actions';
import { i18nCONFIG } from '../constants/i18n';

const db = SQLite.openDatabase('db.db');
i18nCONFIG()

class setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            DowName:'',
            belongedTemple:'',
            email:''
        };
    }

    componentWillMount(){
        db.transaction(sql => {
            sql.executeSql('SELECT * FROM setting', [], (_, { rows }) =>{
                let data =  rows.item(0);
                if(data){
                    this.setState({
                        name: data.name,
                        DowName: data.DowName,
                        belongedTemple: data.belongedTemple,
                        email: data.email
                    });
                }
            });
        }) 
    }

    render() {
        return (
            <ScrollView style={styles.container}  ref="_scrollView">
                <View>
                    <Text style={styles.label}>{I18n.t('setting.name')}</Text>
                    <TextInput 
                    style={styles.inputStyle}
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}/>

                    <Text style={styles.label}>{I18n.t('setting.DowName')}</Text>
                    <TextInput 
                    style={styles.inputStyle}
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    onChangeText={(DowName) => this.setState({DowName})}
                    value={this.state.DowName}/>

                    <Text style={styles.label}>{I18n.t('setting.belongedTemple')}</Text>
                    <TextInput
                    style={styles.inputStyle}
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    onChangeText={(belongedTemple) => this.setState({belongedTemple})}
                    value={this.state.belongedTemple}
                    onFocus={() => { this.refs._scrollView.scrollTo(75); }}/>

                    <Text style={styles.label}>{I18n.t('setting.email')}</Text>

                    <TextInput 
                    style={styles.inputStyle}
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    onFocus={() => { this.refs._scrollView.scrollTo(150); }}/>

                    <View style={{padding:10}}>
                        <Button 
                            title={I18n.t('setting.confirm')} 
                            onPress={this._saveSetting} />
                    </View>
                </View>
                <View style={{height:350}}>
                </View>
            </ScrollView>
        );
    }

    _saveSetting = () => {
        db.transaction(sql => {
            console.log(sql)
            sql.executeSql('INSERT OR REPLACE INTO setting (id,name,DowName,belongedTemple,email) values ('+
            '1,"'+this.state.name+'","'+this.state.DowName+'","'+this.state.belongedTemple+'","'+this.state.email+'");', [], (_, { rows }) =>{
                ToastAndroid.show(I18n.t('saved'),ToastAndroid.SHORT)
                console.log(rows);
            });
        }) 
    };
}

const mapStateToProps = ({ selectedDate }) => ({ selectedDate });
export const settingScreen = connect(mapStateToProps, { selectDate })(setting);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#fff'
    },
    inputStyle:{
        borderColor:'grey',
        borderBottomWidth:1,
        padding:5,
        marginBottom:10,
        height:40,
        fontSize:18,
    },
    label:{
        fontSize:25,
    }
});
  