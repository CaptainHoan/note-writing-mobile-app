import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, {useState, useLayoutEffect, useRef, useEffect} from 'react'
import Parse from "parse/react-native";
import { AntDesign } from '@expo/vector-icons';

const WriteNoteScreen = ({navigation, route}) => {

    const {folderName} = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false
        })
    },[])

    const [note, setNote] = useState('')

    const addNoteToDatabase = async() => {

      const currentUser = await Parse.User.currentAsync();
      const username = currentUser.get('username');

      try{
        const addNote = new Parse.Object(folderName);
        addNote.set('username', username)
        addNote.set('note', note) //add note to Parse Class username database
        await addNote.save();
      }catch(error) {
        Alert.alert(error.message)
      }
    }

  return (
    <View style={{backgroundColor: 'black', flex: 1, paddingHorizontal: 10}}>
      <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="closecircleo" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{fontSize: 18, color: 'white'}}>{`${folderName}'s note`}</Text>
        <TouchableOpacity onPress={() => {
          addNoteToDatabase();
          navigation.goBack();
        }}>
          <Text style={{fontSize: 18, color: note ? 'white' : 'gray'}}>Done</Text>
        </TouchableOpacity>
        
      </View>

      <TextInput 
        placeholder='Start writing'
        placeholderTextColor={'white'}
        autoFocus={true}
        value={note}
        onChangeText={value => setNote(value)}
        multiline={true}
        style={{fontSize: 25, color: 'white'}}
      />
    </View>
  )
}

export default WriteNoteScreen