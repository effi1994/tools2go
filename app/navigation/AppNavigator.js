import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';



import LisingEditScreen from './../screens/LisingEditScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import NewListingButton from './NewListingButton';
import routes from './routes';
import useNotifications from '../hooks/useNotifications';


const Tab = createBottomTabNavigator();






const AppNavigator = () => {
       useNotifications(routes.MY_ACCOUNT);
       
  


       return (
              <Tab.Navigator>
                     <Tab.Screen name={routes.HOME} component={FeedNavigator} options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                   <MaterialCommunityIcons name="home" color={color} size={size} />
                            )
                     }} />
                     <Tab.Screen name={routes.LISTING_EDIT} component={LisingEditScreen} options={({ navigation }) => ({
                            headerShown: false,
                            tabBarButton: () => <NewListingButton onPress={() => navigation.navigate(routes.LISTING_EDIT)} />,
                            tabBarIcon: ({ color, size }) => (
                                   <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
                            )
                     })} />
                     <Tab.Screen name={routes.MY_ACCOUNT} component={AccountNavigator} options={{
                            headerShown: false,
                            tabBarIcon: ({ color, size }) => (
                                   <MaterialCommunityIcons name="account" color={color} size={size} />
                            )
                     }} />
              </Tab.Navigator>
       );
}




export default AppNavigator;
