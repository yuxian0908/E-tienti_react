import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, ButtonGroup } from 'react-native-elements';

import { BUTTON_GROUP_STYLES } from '../../constants/Layout';
import { TEST_DB } from './functions'

export class TestButtons extends React.Component {
  
  render() {
    const testTable = TEST_DB;
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={testTable.testShowTables} 
            style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                testShowTables  
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={testTable.testFindall} 
            style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                testFindall  
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={testTable.testDropTable} 
            style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                testDropTable  
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={testTable.testInsert} 
            style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                testInsert  
                </Text>
            </TouchableOpacity>
        </View>
    );
  }
}
