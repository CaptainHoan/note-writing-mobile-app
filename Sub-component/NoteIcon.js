import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NoteIcon = ({folderName}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('writenote', {
      folderName: folderName
      })}>
        <MaterialCommunityIcons name="note-edit" size={27} color="white" />
    </TouchableOpacity>
  )
}

export default NoteIcon