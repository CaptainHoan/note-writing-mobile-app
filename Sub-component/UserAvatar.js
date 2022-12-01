import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import Parse from "parse/react-native";
import { Avatar } from "@rneui/base";

const UserAvatar = () => {

    //useState hooks to setProfilePicture to whatever return from Parse database
    const [profilePicture, setProfilePicture] = useState(null)

    //useEffest hooks to query userpProfilePicture from Parse database
    useEffect(() => {
      const queryPicture = async() => {
        const currentUser = await Parse.User.currentAsync(); //query current User
        const username = currentUser.get('username')
        const parseQuery = new Parse.Query('ProfilePicture'); //query current ProfilePicture database => retunn an array
        parseQuery.contains('username', username); //filter to get exactly the userPofilePicture

        try {
          let queryResults = await parseQuery.find();
          //console.log('this is', queryResults)
          const profilePicture = queryResults[0].get("userProfilePicture")
          setProfilePicture(profilePicture)

        } catch(error) {
          console.log(error.type)
        }
      }
      queryPicture();
    },[profilePicture])

  return (
    <TouchableOpacity style={{marginLeft: 10}}>
      <Avatar
          activeOpacity={0.2}
          containerStyle={{ backgroundColor: "#BDBDBD" }}
          icon={{}}
          iconStyle={{}}
          rounded
          size="small"
          source={{ uri: profilePicture }}
        />
    </TouchableOpacity>
  )
}

export default UserAvatar