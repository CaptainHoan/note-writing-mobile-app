import { View, Text, TouchableOpacity, Easing, Animated } from 'react-native'
import React from 'react'
import { styles } from '../StyleSheet'
import Swiper from 'react-native-swiper'
import * as Animatable from 'react-native-animatable';

const SignScreen = ({navigation}) => {

  return (
    <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
 
        {/**Swiper animation */}
        <Swiper loop={true} 
            autoplayTimeout={4.5}
            containerStyle={{
                marginBottom: 50
            }}
            autoplay={true}
        >
            <View 
                style={{flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text style={{fontWeight: 'bold', fontSize: 25}}>Get organized</Text>
                
                <Animatable.Image 
                    source={require("../assets/animations/16952-group-working.gif")}
                    style={styles.Lottie}
                    
                />

            </View>
            <View  
                style={{flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
            <Text style={{fontWeight: 'bold', fontSize: 25}}>Stay on top of your work</Text>
            
                <Animatable.Image 
                    source={require("../assets/animations/93874-workingg.gif")}
                    style={styles.Lottie}
                    
                />
            </View>
            <View  
                style={{flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
            <Text style={{fontWeight: 'bold', fontSize: 25}}>Visit web to do even more</Text>
            
                <Animatable.Image 
                    source={require("../assets/animations/91552-working.gif")}
                    style={styles.Lottie}
                    
                />
            </View>
        </Swiper>

        {/** Sign Button */}
        <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')} 
        style={{ backgroundColor: '#7054B5', paddingHorizontal: 100, paddingVertical: 8, borderRadius: 50}}>
            <Text style={{color: 'white', fontSize: 16}}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: 16, marginBottom: 40}}>
            <Text style={{color: '#7054B5', fontSize: 16}}>Log in</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SignScreen