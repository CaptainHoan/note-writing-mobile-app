import { View, Text, SafeAreaView, Image, TextInput, Button, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../StyleSheet'
import { Formik } from 'formik'
import * as yup from 'yup'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Avatar } from "@rneui/base";
import * as ImagePicker from 'expo-image-picker';
import Parse from "parse/react-native";
import { useDispatch } from 'react-redux'
import { addUser, selectUser } from '../Redux/addUserSlice';
import { useSelector } from 'react-redux'

const SignupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})

const SignUpScreen = ({navigation}) => {

  const dispatch = useDispatch()

  const [secureText, setSecureText] = useState(true)

  const secureTextEntry = () => {
    setSecureText(!secureText)
  }

  const [isLoading, setLoading] = useState(false)

  const signUpUser = useSelector(selectUser)

  const signupUser = async function (username, password) {
    // Note that these values come from state variables that we've declared before
    // Since the signUp method returns a Promise, we need to call it using await
    return await Parse.User.signUp(username, password)
      .then( async(createdUser) => {
        // Parse.User.signUp returns the already created ParseUser object if successful
        console.log(createdUser)
        const currentUser = await Parse.User.currentAsync();
        if (createdUser == currentUser) {
          console.log(currentUser)
          let username = currentUser.get('username')
          let objectId = currentUser.get('ObjectId')
          const update = new Parse.Object('ProfilePicture');
          //update ProfilePicture database
          update.set('userProfilePicture', signUpUser.profilePicture);
          update.set('username', username);
          //update.set('ObjectId', objectId)
          await update.save();
          //dispatch action and userInformation to redux store
          dispatch(addUser({
            usertoken: currentUser.get('sessionToken'),
            username: currentUser.get("username"),
          })) 
        }
      })
      .catch((error) => {
        // signUp can fail if any parameter is blank or failed an uniqueness check on the server
        Alert.alert("Error!", error.message);
      });
  };

  const [image, setImage] = useState("https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo.png");

  const pickImage = async () => {
    
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
      //dispatch userProfileImage to redux store
        dispatch(addUser({
          profilePicture: result.uri
        }))
      }
    catch (error) {
      console.log(error.message)
    } 
  } 

  return (
    <View style={{backgroundColor: 'black', flex: 1, paddingHorizontal: 50 }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image 
          source={require('../assets/animations/Asana-Logo-Horizontal-White.png')}
          style={{ height: 115, width: 130, resizeMode: 'contain' }}
        />
      </View>

      <TouchableOpacity
      onPress={pickImage} 
      style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
        <Avatar
          activeOpacity={0.2}
          containerStyle={{ backgroundColor: "#BDBDBD" }}
          //onPress={setImage}
          icon={{}}
          iconStyle={{}}
          rounded
          size="xlarge"
          source={{ uri: image }}
        />
      </TouchableOpacity>

      <View>

        {/**Formik validation */}
        <Formik
          validationSchema={SignupValidationSchema}
          initialValues={{username: '', email: '', password: '' }}
          onSubmit={values => {
            signupUser(values.username, values.password)
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

                      <View style={{marginBottom: 20}}>
                        <View style={[styles.signupcontainer, {flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}]}>
                        <TextInput
                        name="email"
                        placeholder="name@company.com"
                        placeholderTextColor={'gray'}
                        style={styles.textInput}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                        handleReset={handleReset}
                      />

                          {values.email && (
                            <TouchableOpacity onPress={handleReset}>
                              <AntDesign name="closecircle" size={16} color="gray" />
                            </TouchableOpacity>
                          )}
                        </View>

                        {errors.email &&
                          <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                        }
                      </View>
                      
                      
                      <View style={{marginBottom: 15}}>
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
                        
                        {errors.password &&
                          <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                        }
                      </View>
                      
                      {isLoading 
                        ? ( <ActivityIndicator size="small" />)
                        : (<Button title='Sign up' onPress={handleSubmit} disabled={!isValid} color={'#7054B5'}/>)
                      }

                      <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Text style={{fontSize: 17, color: 'gray'}}>Already use Asana? {' '}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                          <Text style={{color: '#7054B5', fontSize: 17}}>Log in</Text>
                        </TouchableOpacity>
                      </View>

                    </>
                  )}
        </Formik>
      </View>

    </View>
  )
}

export default SignUpScreen