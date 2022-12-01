import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { AntDesign, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const NoteFolder = ({note}) => {
  return (
    <View style={{paddingHorizontal: 20}}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>Notes</Text>

        {/**Search note component */}
        <View 
            style={{flexDirection: 'row', 
                alignItems: 'center',
                backgroundColor: '#353937',
                padding: 5,
                paddingLeft: 10,
                //flex: 1,
                marginTop: 15,
                borderRadius: 15
            }}>
        <AntDesign name="search1" size={22} color="white" style={{marginRight: 5}}/>
        <TextInput 
            placeholder='Search'
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

        {/**show Note fetched from database */}
        <View style={{
              marginTop: 20,
              backgroundColor: note.length > 0 ? '#353937' : "black",
              padding: 10,
              borderRadius: 15
            }}>
            {note.map((eachNote, index) => (
                <TouchableOpacity key={index} style={{
                    borderBottomWidth: 1,
                      borderBottomColor: 'gray',
                      padding: 10
                }}>
                    
                    <View>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20 }}>{eachNote.get("note")}</Text>
                    </View> 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Feather name="folder" size={20} color="gray" style={{marginRight: 5}}/>
                        <Text style={{color: 'gray'}}>Notes</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    </View>
  )
}

export default NoteFolder