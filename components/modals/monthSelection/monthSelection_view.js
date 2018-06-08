import React from 'react';
import { View, Modal, Text, TouchableOpacity, ScrollView, TextInput, PixelRatio } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { selectMonth, getStriveRecord } from '../../../redux/actions';
import { MonthSelection_Fn } from './monthSelection_function';
import I18n from 'ex-react-native-i18n';
import { i18nCONFIG } from '../../../constants/i18n';
import { BUTTON_GROUP_STYLES } from '../../../constants/Layout';

i18nCONFIG();

let culFontSize = (size)=>{
  let modSize = size*PixelRatio.get()/3;
  return modSize/PixelRatio.getFontScale();
}


class MonthSelection extends React.Component {
  state = {
    modalVisible: false,
  };
  setModalVisible = (visible)=> {
    // console.log(this);
    this.setState({modalVisible: visible});
  }

  componentWillMount(){
    const { striveRecord, selectedDate:{ selectedDay }, selectMonth } = this.props;
    this.props.selectMonth({year:selectedDay.year, month:selectedDay.month});
  }

  componentDidUpdate() {
    if(this.state.modalVisible){
      MonthSelection_Fn.defaultSelect(this);
    }
  }

  render() {
    const { striveRecord, selectedDate:{ selectedDay }, selectMonth } = this.props;
    const {monthAry,yearAry} = MonthSelection_Fn;

    return (
        <View>
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
            <View style={styles.ModalContainer}>

              <View style={styles.ScrollContainer}>
                <ScrollView 
                  style={styles.yearScrollContainer}
                  showsVerticalScrollIndicator= {false}
                  onContentSizeChange={(width,height)=>{
                    this.yearScrollHeight = height;
                  }}
                  ref={(year) => { 
                    this.yearCtrl = year;
                  }}
                  onScrollEndDrag={(e)=>{
                    this.yearOffset= e.nativeEvent.contentOffset.y;
                  }}>
                  <View style={{alignItems:'center'}}>
                    {yearAry.map((key,index)=>{
                      return(
                        <TouchableOpacity
                          key= {index}
                          onPress={() => {
                            console.log('year touched')
                          }}>
                          <Text key= {index} style={styles.touchFont}>{key}</Text>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </ScrollView>
              <View style= {styles.yearTopShadowbox} />
              <View style= {styles.yearBottomShadowbox} />

                <ScrollView 
                style={styles.monthScrollContainer}
                showsVerticalScrollIndicator= {false}
                onContentSizeChange={(width,height)=>{
                  this.monthScrollHeight = height;
                }}
                ref={(month) => {
                  this.monthCtrl = month;
                }}
                onScrollEndDrag={(e)=>{
                  this.monthOffset= e.nativeEvent.contentOffset.y;
                }}>
                  <View style={{alignItems:'center'}}>
                    {monthAry.map((key,index)=>{
                      return(
                        <TouchableOpacity
                          key= {index}
                          onPress={() => {
                            console.log('month touched')
                          }}>
                          <Text 
                          key= {index} 
                          style={styles.touchFont}
                          >{key}</Text>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </ScrollView>
              <View style= {styles.monthTopShadowbox} />
              <View style= {styles.monthBottomShadowbox} />

              </View>

              <View style={styles.dicideArea}>
                <TouchableOpacity
                  style={styles.seletFontContain}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text style={styles.seletFont}>{I18n.t('striveRecord.cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.seletFontContain}
                  onPress={() => {
                    MonthSelection_Fn.comfirmSelect(this);
                    this.setModalVisible(!this.state.modalVisible);
                    console.log('confirm');
                  }}>
                  <Text style={styles.seletFont}>{I18n.t('striveRecord.confirm')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
          <View style={{
            flex:1,
            flexDirection:'row', 
            height:50,
            alignItems:'center',
            padding:10
          }}>
            <TouchableOpacity
              style={{flex:0.5}}
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text>{I18n.t('striveRecord.enterMonth')}</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const mapStateToProps = ({ striveRecord, selectedDate, striveCard }) => ({ striveRecord, selectedDate, striveCard });

export const MonthSelectionCpn = connect(mapStateToProps, { selectMonth, getStriveRecord })(MonthSelection);

const styles = {
  ModalContainer: {
    backgroundColor:'rgba(220,220,220,1)',
    margin: 20,
    marginBottom:0,
    paddingBottom:0,
    padding: 20,
    bottom: 230,
    left: 20,
    right: 20,
    height: 140,
    position: 'absolute',
    elevation: 20
  },
  ScrollContainer:{
    flex:1,
    height: 80,
    left: 20,
    right: 20,
    margin: 20,
    bottom: 5,
    marginBottom:5,
    paddingBottom:5,
    position: 'absolute',
    flexDirection:'row',
    width:200
  },
  yearTopShadowbox:{
    left: 0,
    top: 0,
    position: 'absolute',
    backgroundColor:'rgba(220,220,220, 0.8)',
    borderBottomColor:'#CCCCCC',
    borderBottomWidth:2,
    height: 20,
    width:100
  },
  yearScrollContainer:{
    backgroundColor:'rgba(220,220,220,1)',
    flex:0.5,
    height: 80,
  },
  yearBottomShadowbox:{
    left: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor:'rgba(220,220,220, 0.8)',
    borderTopColor:'#CCCCCC',
    borderTopWidth:2,
    height: 20,
    width:100
  },
  monthTopShadowbox:{
    right: 0,
    top: 0,
    position: 'absolute',
    backgroundColor:'rgba(220,220,220, 0.8)',
    borderBottomColor:'#CCCCCC',
    borderBottomWidth:2,
    height: 20,
    width:100
  },
  monthScrollContainer:{
    backgroundColor:'rgba(220,220,220,1)',
    flex:0.5,
    height: 80,
  },
  monthBottomShadowbox:{
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor:'rgba(220,220,220, 0.8)',
    borderTopColor:'#CCCCCC',
    borderTopWidth:2,
    height: 20,
    width:100
  },
  dicideArea:{
    flex:1,
    flexDirection:'row',
    height: 35,
    left: 0,
    right: 0,
    paddingTop:5,
    position: 'absolute',
    backgroundColor:'rgba(248, 248, 255, 1)',
    borderBottomColor:'grey',
    borderBottomWidth:1,
  },
  seletFontContain:{
    flex:0.5,
    alignItems: 'center',
  },
  seletFont:{
    fontSize: culFontSize(20),
    fontWeight: 'bold',
    color: '#7AC5CD'
  },
  touchArea:{ 
    paddingTop: 4,
    paddingBottom: 4 
  },
  touchFont:{
    fontSize: culFontSize(30)
  }
};