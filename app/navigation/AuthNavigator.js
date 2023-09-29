import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from './../screens/LoginScreen';
import ResetPassword from './../screens/ResetPassword';
import routes from './routes';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.WELCOME} component={WelcomeScreen} options={{headerShown:false}} />
    <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
    <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    <Stack.Screen name={routes.RESET_PASSWORD} component={ResetPassword} />
    
  </Stack.Navigator>
);

export default AuthNavigator;