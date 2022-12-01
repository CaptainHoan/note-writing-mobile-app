import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignScreen from '../AuthenticationScreen.js/SignScreen';
import SignUpScreen from '../AuthenticationScreen.js/SignUpScreen';
import LogInScreen from '../AuthenticationScreen.js/LogInScreen';
import { AntDesign } from '@expo/vector-icons';

const SignUserStack = createStackNavigator();

const SignStack = () => {
  return (
    
        <SignUserStack.Navigator
            initialRouteName='Sign'
            screenOptions={({navigation}) => ({
                headerBackTitle: () => null,
                headerTitle: () => null,
                headerStyle: {
                    backgroundColor: 'black',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0
                },
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Sign')}>
                        <AntDesign name="close" size={24} color="white" style={{marginLeft: 8}}/>
                    </TouchableOpacity>
                    
                ),
                
             })}
        >
            <SignUserStack.Screen name="Sign" component={SignScreen} 
                options={{headerShown: false}}
            />
            <SignUserStack.Screen name="SignUp" component={SignUpScreen} />
            <SignUserStack.Screen name="Login" component={LogInScreen}/>
        </SignUserStack.Navigator>
    
        
  )
}

export default SignStack