import { NavigationContainer } from '@react-navigation/native';
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage'
import RootStack from './Stacks/RootStack';
import { Provider } from 'react-redux'
import store from './Redux/store';
import SplashScreen from './SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  'mtKA7rpR81Kmk1Ga4cI5TdTfhIionrHNUY2gdExF',
  'JNyiqkeEp0LqoZD7a9tMizYjpymjZZ2TE4i43Oal'
);
Parse.serverURL = 'https://parseapi.back4app.com/';

const mainStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <mainStack.Navigator initialRouteName='splash'
         screenOptions={{
          headerShown: false
         }}
        >
          <mainStack.Screen name="splash" component={SplashScreen} />
          <mainStack.Screen name="root" component={RootStack} />
        </mainStack.Navigator>
      </NavigationContainer>  
    </Provider>
  );
}

