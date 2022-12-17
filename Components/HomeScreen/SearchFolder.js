import { View, Text, TextInput } from 'react-native'
import React, {useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';

const SearchFolder = () => {

  return (
    <View style={{flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#4D4D4D',
    padding: 10,
    paddingLeft: 10,
    //flex: 1,
    marginTop: 15,
    borderRadius: 15
    }}>
      <AntDesign name="search1" size={22} color="white" style={{marginRight: 5}}/>
      <TextInput 
        placeholder='Seach your folder'
        placeholderTextColor={'white'}
        //value={value => onChangeText(value)}
        //onKeyPress={(value) => console.log(value)}
        style={{
          fontSize: 16,
          flex: 1,
          color: 'white'
        }}
      />
    </View>
  )
}

export default SearchFolder