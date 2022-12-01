import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, {useLayoutEffect, useEffect, useState} from 'react'
import { Entypo } from '@expo/vector-icons';
import NoteFooter from '../Components/NoteScreen/NoteFooter';
import Parse from "parse/react-native";
import NoteFolder from '../Components/NoteScreen/NoteFolder';

const NoteScreen = ({navigation, route}) => {

    const {folderName} = route.params

    useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: folderName,
          headerTintColor: 'white',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: 'black'
          },
          
        headerRight: () => (
                <TouchableOpacity style={{marginRight: 10}}>
                    <Entypo name="dots-three-horizontal" size={24} color="white" />
                </TouchableOpacity>
            )
        });
      },[])

  const [note, setNote] = useState([])

  const addNote = () => {
    
  }

  const  fetchNoteFromDatabase = async() => {

    //create a query to fetch data from Parse database
    const queryNote = new Parse.Query(folderName)

    try {
      const queryNoteResults = await queryNote.find();
      const queryNoteResultsToArray = Object.entries(queryNoteResults)
      setNote(queryNoteResults)
      //console.log(note)
    }
    catch(error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchNoteFromDatabase();
  }, [note])

  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <NoteFolder note={note}/>
        </ScrollView>
        <NoteFooter 
        folderName = {folderName}
        note={note}
        />
    </SafeAreaView>
  )
}

export default NoteScreen