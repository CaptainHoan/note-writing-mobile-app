import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, {useEffect, useState, useLayoutEffect, useMemo} from 'react'
import Parse from "parse/react-native";
import Folder from '../Sub-component/Folder';
import UserAvatar from '../Sub-component/UserAvatar';
import HomeFolder from '../Components/HomeScreen/HomeFolder';
import SearchFolder from '../Components/HomeScreen/SearchFolder';

const HomeScreen = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'folder',
      headerTintColor: 'white',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: 'black'
      },
      //Folder Button to create your box
      headerRight: () => <Folder fetchFolder={fetchFolder} />,
      //avatar Button to log out 
      headerLeft: () => <UserAvatar />
    })
  },[])

  const [folder, setFolder] = useState([]) //useState hooks to keep track of the data every time it changes

    const fetchFolder = async() => {
      const currentUser = await Parse.User.currentAsync();
      const username = currentUser.get('username')
      const queryFolder = new Parse.Query(username) //query Parse whose name is whatever currentUser'name is
      try {
        const queryFolderResults = await queryFolder.find(); //find all the data inside the class
        setFolder(queryFolderResults)
      } catch(error) {
        Alert.alert(error.message)
      }
    }

    //useEffect hooks: retrieve data from the database and render it on the screen
    useEffect(() => {
      fetchFolder();
    },[folder])
  
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1, paddingHorizontal: 15}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchFolder />
        <HomeFolder folder={folder}/>
      </ScrollView>  
    </SafeAreaView>
  )
}

export default HomeScreen