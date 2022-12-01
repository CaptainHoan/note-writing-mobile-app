import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import SignStack from './SignStack';
import MainScreenStack from './MainScreenStack';
import Parse from 'parse/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { selectUser } from '../Redux/addUserSlice';


const RootStack = () => {

  const currentUser = useSelector(selectUser)

  useEffect(() => {
    const getUserToken = async() => {
      const currentUserToken = await Parse.User.currentAsync()

      return Boolean(currentUser?.usertoken === currentUserToken.get('sessionToken'))
      
    }
    getUserToken()
  },[])

  return (
    <>
        {currentUser?.usertoken ? (
          <MainScreenStack />
        ) : (
          <SignStack/>
        )}
    </>
  )
}

export default RootStack