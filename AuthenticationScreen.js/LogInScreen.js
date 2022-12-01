import { View, Text, SafeAreaView, Image, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useRef, useState} from 'react'
import { styles } from '../StyleSheet'
import { Formik } from 'formik'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Alert } from 'react-native'
import Parse from 'parse/react-native';
import { useDispatch } from 'react-redux'
import { addUser } from '../Redux/addUserSlice';

const LogInScreen = () => {

  const [isLoading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const [secureText, setSecureText] = useState(true)

  const secureTextEntry = () => {
    setSecureText(!secureText)
  }

  const LogUserIn = async function (username, password) {
    // Note that these values come from state variables that we've declared before
    
    return await Parse.User.logIn(username, password)
      .then(async (loggedInUser) => {
        setLoading(true)
        // logIn returns the corresponding ParseUser object
        console.log('loggin successfully');
        // To verify that this is in fact the current user, currentAsync can be used
        const currentUser = await Parse.User.currentAsync();
        if (loggedInUser == currentUser) {
          console.log(currentUser)
          //dispatch action and userInformation to redux store
          dispatch(addUser({
            usertoken: currentUser.get('sessionToken'),
            username: currentUser.get("username")
          }))
        }
      })
      .catch((error) => {
        // Error can be caused by wrong parameters or lack of Internet connection
        Alert.alert('Error!', error.message);
        setLoading(false)
      });
  };

  return (
    <View style={{backgroundColor: 'black', flex: 1, paddingHorizontal: 50 }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image 
          source={require('../assets/animations/Asana-Logo-Horizontal-White.png')}
          style={{ height: 150, width: 130, resizeMode: 'contain' }}
        />
      </View>
      
      <View>

        {/**Formik validation */}
        <Formik
          initialValues={{username: '', password: '' }}
          onSubmit={values => {
            LogUserIn(values.username, values.password);
            setLoading(true)
          }}
          validateOnMount={false}
         >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              handleReset
            }) => (
                    <>

                      <View style={{marginBottom: 20}}>
                        <View style={[styles.signupcontainer, {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}]}>
                          <TextInput
                          name="username"
                          placeholder="your username"
                          placeholderTextColor={'gray'}
                          style={styles.textInput}
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          value={values.username}
                          
                          />

                          {values.username && (
                            <TouchableOpacity onPress={handleReset}>
                              <AntDesign name="closecircle" size={16} color="gray" />
                            </TouchableOpacity>
                          )}
                        </View>
                        
                      </View>
                      
                      
                      <View style={{marginBottom: 40}}>
                        <View style={[styles.signupcontainer, {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}]}>
                          <TextInput
                          name="password"
                          placeholder="password"
                          placeholderTextColor={'gray'}
                          style={styles.textInput}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          secureTextEntry={secureText}
                          />
                          {values.password && (
                            <TouchableOpacity onPress={secureTextEntry}>
                              <Entypo name={secureText == false ? "eye-with-line" : 'eye'} size={18} color="gray" />
                            </TouchableOpacity>
                          )}
                        </View>
                        
                      </View>
                      
                      <TouchableOpacity
                      onPress={handleSubmit} 
                      style={{backgroundColor: '#7054B5', paddingVertical: 10, borderRadius: 50}}
                      >
                        {isLoading 
                          ? ( <ActivityIndicator size="small" />)
                          : (<Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>Sign in</Text>)
                        }
                      </TouchableOpacity>

                      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
                        <Text style={{color: 'gray', textAlign: 'center'}}>By continuing, you agree to the Terms of Service and Privacy Policy</Text>
                      </View>
                    </>
                  )}
        </Formik>
      </View>
    </View>
  )
}

export default LogInScreen