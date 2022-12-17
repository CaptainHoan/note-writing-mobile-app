import { View, Text, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { MaterialCommunityIcons, AntDesign, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import Parse from "parse/react-native";
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const HomeFolder = ({folder, note}) => {

  const navigation = useNavigation();

  return (
    <>
      {!folder.length //condition to render if:  
      // the Parse database dont have actual data about the user's folder => show the tutorial as follow:
        ? (
          <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 120}}>
            <Image 
              source={{uri: 'https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png'}}
              style={{height: 180, width: 180, marginBottom: 30}}
            />
            <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold', color: 'white'}}>Click <MaterialCommunityIcons name="folder-upload-outline" size={27} color="white" /> to create your own folder and start writing your note</Text>
          </View>
        ) // if have data about user's folder => render as below
        : (
          <View>
            <View style={{
              marginTop: 20,
              backgroundColor: '#4D4D4D',
              padding: 10,
              borderRadius: 15
            }}>
              {folder.map((fol, index) => (
                <Swipeable renderRightActions={swipeRightContent} key={index}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('note', {
                      folderName: fol.get('folderName')
                    })}  
                    style={{
                      flexDirection: 'row', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      borderBottomWidth: 1,
                      borderBottomColor: 'white',
                      padding: 10
                  }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialIcons name="folder-shared" size={30} color="orange" style={{marginRight: 10}}/>
                      <Text style={{fontSize: 17, fontWeight: 'bold', color: 'white'}}>{fol.get('folderName')}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>

                      {/** retrieve data about the number of notes inside one folder*/}
                      <Text 
                        style={{fontSize: 17, fontWeight: 'bold', color: 'gray'
                      }}>
                        0
                      </Text>

                      <Ionicons name="arrow-forward-circle-outline" size={24} color="gray" style={{marginLeft: 10}}/>
                    </View>

                  </TouchableOpacity>
                </Swipeable>
              ))}
            </View>
          </View>
        )
      }
    </>
  )
}

const swipeRightContent = (
    progress = Animated.AnimatedInterpolation,
    dragX = Animated.AnimatedInterpolation,
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-150, -20],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
  return(
    <View >
      <Animated.View style={[styles.swipeContainer, {opacity}]}>
        <TouchableOpacity style={[styles.SwipeContent, {backgroundColor: '#1273DE'}]}>
          <FontAwesome name="user-circle-o" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.SwipeContent, {backgroundColor: '#9C27B0'}]}>
          <MaterialIcons name="save-alt" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.SwipeContent}>
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  swipeContainer: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
  },
  SwipeContent: {
    backgroundColor: '#b60000',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 20
  }
})
export default HomeFolder