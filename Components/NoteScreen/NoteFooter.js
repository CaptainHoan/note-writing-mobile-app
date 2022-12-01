import { View, Text } from 'react-native'
import React from 'react'
import NoteIcon from '../../Sub-component/NoteIcon'

const NoteFooter = ({folderName, note}) => {
  return (
    <View style={{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'orange',
        padding: 10
        }}>
      <Text></Text>
      <Text style={{color: 'white'}}>{`${note.length} ${note.length > 1 ? 'notes' : 'note'}`}</Text>
      <NoteIcon folderName={folderName} />
    </View>
  )
}

export default NoteFooter