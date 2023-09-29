import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListingsScreen from './../screens/ListingsScreen';
import ListingDetailsScreen from './../screens/ListingDetailsScreen';
import routes from './routes';
import LoginScreen from './../screens/LoginScreen';
import RantProduct from './../screens/RantProduct';
import CreditCardScreen from '../screens/CreditCardScreen';
import ProfileScreen from '../screens/ProfileScreen';



const Stack = createNativeStackNavigator();

const FeedNavigator = () => (
      <Stack.Navigator mode="modal" >
            <Stack.Screen name={routes.LISTINGS} component={ListingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name={routes.LISTING_DETAILS} component={ListingDetailsScreen} />
            <Stack.Screen name={routes.RANT} component={RantProduct}  />
            <Stack.Screen name={'Add credit card'} component={CreditCardScreen}  />

      </Stack.Navigator>
)

export default FeedNavigator;


