import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../MainScreens/HomeScreen';
import NoteScreen from '../MainScreens/NoteScreen';
import WriteNoteScreen from '../MainScreens/WriteNoteScreen';

const ScreenStack = createStackNavigator();

const MainScreenStack = () => {
  return (
      <ScreenStack.Navigator
          initialRouteName='home'
      >
          <ScreenStack.Screen name="home" component={HomeScreen} />
          <ScreenStack.Screen name="note" component={NoteScreen}/>
          <ScreenStack.Screen name="writenote" component={WriteNoteScreen}
            options={{presentation: 'modal'}}
          />
      </ScreenStack.Navigator>
    
    
  )
}

export default MainScreenStack