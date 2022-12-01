import { View, Text, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import Parse from "parse/react-native";
import { useNavigation } from '@react-navigation/native';


const SplashScreen = () => {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('root')
        },2000)
    })

  return (
    <View style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc'
        }}>
      <Image
        source={require('./assets/animations/Asana-Logo-Horizontal-White.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
    </View>
  )
}

export default SplashScreen