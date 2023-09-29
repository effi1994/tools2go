import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import routes from './routes';
import MyCreditCardScreen from '../screens/MyCreditCardScreen';
import UserChatScreen from '../screens/UserChatScreen';
import MyProductsRentScreen from '../screens/MyProductsRentScreen';
import ImageProductUpdate from '../Components/ImageProductUpdate';





const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
       <Stack.Navigator>
              <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
              <Stack.Screen name={routes.MESSAGES} component={MessagesScreen}  />
              <Stack.Screen name={routes.USER_CHATS} component={UserChatScreen}  /> 
              <Stack.Screen name={routes.PROFILE} component={ProfileScreen} /> 
              <Stack.Screen name={routes.MY_CREDIT_CARD} component={MyCreditCardScreen} />
              <Stack.Screen name={routes.MY_PRODUCTS_RENT} component={MyProductsRentScreen} />
              <Stack.Screen name={routes.Image_Upload_Product_Rent} component={ImageProductUpdate} />
              
       </Stack.Navigator>
)

export default AccountNavigator;


