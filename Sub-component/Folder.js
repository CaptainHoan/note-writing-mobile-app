import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import Parse from "parse/react-native";

const Folder = ({fetchFolder}) => {

  //create function showFolderAlert() to Alert user about creating folder
  const [isVisible, setIsvisible] = useState(false)

  const toggleFolderAlert = () => {
    setIsvisible(!isVisible)
  }

  const [inputText, setInputText ] = useState('')

  const saveFolder = async() => {
    const currentUser = await Parse.User.currentAsync();
    const username = currentUser.get('username');

    // try() to push data to Parse database
    try{
      const newFolder = new Parse.Object(username);

      newFolder.set('username', username)
      newFolder.set('folderName', inputText) //add folder'name to Parse Class username database
      await newFolder.save();
    }catch(error) {
      Alert.alert(error.message)
    }
  }

  return (
    <>
      <TouchableOpacity style={{marginRight: 10}} onPress={toggleFolderAlert}>
        <AntDesign name="pluscircle" size={24} color="white" />
      </TouchableOpacity>
      
      <Dialog.Container visible={isVisible}>
        <Dialog.Title>New Folder</Dialog.Title>
        <Dialog.Description>
          Enter a name for this folder
        </Dialog.Description>

        {/**TextInput where user can enter their folder's name */}
        <Dialog.Input 
          placeholder='Name'
          autoFocus={true}
          value={inputText}
          onChangeText={value => setInputText(value)}
        />

        <Dialog.Button label="Cancel" onPress={toggleFolderAlert} />

        {/**Button to save name of the folder to the parse database */}
        <Dialog.Button label="Save" onPress={() => {
          saveFolder();
          toggleFolderAlert();
          fetchFolder();
        }}/> 
      </Dialog.Container>
    </>
    
  )
}

export default Folder